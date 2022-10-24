import argparse
import dataclasses
import io
import sys
from enum import Enum
from typing import Literal

import colorama
import dacite
import toml


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
    colours: StreamHandlerColours = StreamHandlerColours()


@dataclasses.dataclass
class Logging:
    levels: LoggingLevels = LoggingLevels()
    file_handler: FileHandler = FileHandler()
    stream_handler: StreamHandler = StreamHandler()


@dataclasses.dataclass
class Config:
    general: General
    application: Application
    connections: Connections
    logging: Logging = Logging()


def load_config(file: io.TextIOWrapper) -> Config:
    try:
        return dacite.from_dict(
            Config,
            toml.load(file),
            dacite.Config(type_hooks={Environment: Environment.__getitem__})
        )
    except toml.TomlDecodeError as error:
        sys.exit(f"'{file.name}' is not a valid TOML file: {error}")
    except dacite.DaciteError as error:
        sys.exit(f"'{file.name}' is invalid: {str(error).capitalize()}.")


parser = argparse.ArgumentParser(
    prog="main.py",
    description="CLI options for running uploader-backend."
)
parser.add_argument(
    "-c", "--config",
    default="config.toml",
    type=open,
    required=False,
    help="Choose a custom .toml config for the application to run with."
)
namespace = parser.parse_args()


CONFIG: Config = load_config(namespace.config)
