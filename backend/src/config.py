import pathlib
import sys
import tomllib
from typing import Annotated, Literal

import colorama
import pydantic

from src.enums import Environment


__all__ = ["CONFIG"]


class General(pydantic.BaseModel):
    environment: Environment

    @pydantic.field_validator("environment", mode="before")
    @classmethod
    def _validate_environment(cls, value: str) -> Environment:
        try:
            return Environment[value.upper()]
        except KeyError:
            raise ValueError(f"Invalid environment: '{value}'")


class Server(pydantic.BaseModel):
    host: pydantic.IPvAnyAddress
    port: int = pydantic.Field(ge=0, le=65535)


class Storage(pydantic.BaseModel):
    postgres_dsn: Annotated[str, pydantic.PostgresDsn]


class Security(pydantic.BaseModel):
    itsdangerous_secret: str


class LoggingLevels(pydantic.BaseModel):
    uploader: Literal["NOTSET", "CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"] = "INFO"
    aiohttp: Literal["NOTSET", "CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"] = "INFO"


class FileHandler(pydantic.BaseModel):
    enabled: bool = True
    path: pydantic.DirectoryPath = pathlib.Path("logs/")
    backup_count: int = 5
    max_file_size: pydantic.ByteSize = pydantic.Field(default="5mib", validate_default=True)


class StreamHandlerColours(pydantic.BaseModel):
    time: str = colorama.Fore.BLUE
    critical: str = colorama.Fore.WHITE
    error: str = colorama.Fore.RED
    warning: str = colorama.Fore.YELLOW
    info: str = colorama.Fore.GREEN
    debug: str = colorama.Fore.MAGENTA


class StreamHandler(pydantic.BaseModel):
    enabled: bool = True
    use_colours: bool = True
    colours: StreamHandlerColours = pydantic.Field(default_factory=StreamHandlerColours)


class Logging(pydantic.BaseModel):
    levels: LoggingLevels = pydantic.Field(default_factory=LoggingLevels)
    file_handler: FileHandler = pydantic.Field(default_factory=FileHandler)
    stream_handler: StreamHandler = pydantic.Field(default_factory=StreamHandler)


class Config(pydantic.BaseModel):
    general: General
    server: Server
    storage: Storage
    security: Security
    logging: Logging = pydantic.Field(default_factory=Logging)


try:
    _config_file = pathlib.Path("backend.config.toml")
    _config = Config.model_validate(tomllib.load(_config_file.open("rb")))
except pydantic.ValidationError as error:
    sys.exit(str(error))

print(f"Loaded config from '{_config_file.name}'.")
CONFIG: Config = _config
