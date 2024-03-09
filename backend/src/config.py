import pathlib
import sys
import tomllib
from typing import Annotated

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


class Storage(pydantic.BaseModel):
    postgres_dsn: Annotated[str, pydantic.PostgresDsn]
    redis_dsn: Annotated[str, pydantic.RedisDsn]


class Security(pydantic.BaseModel):
    itsdangerous_secret: str


class Config(pydantic.BaseModel):
    general: General
    storage: Storage
    security: Security


try:
    _config_file = pathlib.Path("backend.config.toml")
    _config = Config.model_validate(tomllib.load(_config_file.open("rb")))
except pydantic.ValidationError as error:
    sys.exit(str(error))

print(f"Loaded config from '{_config_file.name}'.")
CONFIG: Config = _config
