import argparse
import dataclasses
import io
import sys
import tomllib
from enum import Enum
from typing import Literal

import colorama
import dacite


__all__ = (
    "Environment",
    "CONFIG",
)


class Environment(Enum):
    PRODUCTION = 0
    DEVELOPMENT = 1


@dataclasses.dataclass
class General:
    environment: Environment


@dataclasses.dataclass
class Connections:
    postgres_dsn: str
    redis_dsn: str


@dataclasses.dataclass
class Application:
    host: str
    port: int


@dataclasses.dataclass
class LoggingLevels:
    aiohttp: Literal["NOTSET", "CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"] = "INFO"
    uploader: Literal["NOTSET", "CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"] = "INFO"


@dataclasses.dataclass
class FileHandler:
    enabled: bool = True
    path: str = "logs/"
    backup_count: int = 5
    max_file_size: str = "5mb"


@dataclasses.dataclass
class StreamHandlerColours:
    time: str = colorama.Fore.BLUE
    critical: str = colorama.Fore.WHITE
    error: str = colorama.Fore.RED
    warning: str = colorama.Fore.YELLOW
    info: str = colorama.Fore.GREEN
    debug: str = colorama.Fore.MAGENTA


@dataclasses.dataclass
class StreamHandler:
    enabled: bool = True
    use_colours: bool = True
    colours: StreamHandlerColours = dataclasses.field(default_factory=StreamHandlerColours)


@dataclasses.dataclass
class Logging:
    levels: LoggingLevels = dataclasses.field(default_factory=LoggingLevels)
    file_handler: FileHandler = dataclasses.field(default_factory=FileHandler)
    stream_handler: StreamHandler = dataclasses.field(default_factory=StreamHandler)


@dataclasses.dataclass
class Config:
    general: General
    application: Application
    connections: Connections
    logging: Logging = dataclasses.field(default_factory=Logging)


def load_config(file: io.BufferedReader) -> Config:
    try:
        config = dacite.from_dict(
            Config,
            tomllib.load(file),
            dacite.Config(type_hooks={Environment: Environment.__getitem__})
        )
    except (tomllib.TOMLDecodeError, dacite.DaciteError) as error:
        sys.exit(
            f"Error while parsing {file.name}:\n"
            f"  - {str(error).capitalize()}."
        )
    else:
        print(f"Loaded config from {file.name}.")
        return config


parser = argparse.ArgumentParser(
    prog="launcher.py",
    description="CLI options for running uploader-backend.",
)
parser.add_argument(
    "-c", "--config", required=False,
    default="config.toml", metavar="config.toml",
    type=argparse.FileType(mode="rb"),
    help="Provide a path to the config file that uploader-backend should use.",
)
namespace = parser.parse_args()


CONFIG: Config = load_config(namespace.config)
