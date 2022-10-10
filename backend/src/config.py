import argparse
import dataclasses
import io
import sys

import dacite
import toml

from src import enums


__all__ = (
    "CONFIG",
)


@dataclasses.dataclass
class General:
    environment: enums.Environment


@dataclasses.dataclass
class Connections:
    postgres_dsn: str
    redis_dsn: str


@dataclasses.dataclass
class Config:
    general: General
    connections: Connections


def load_config(file: io.TextIOWrapper) -> Config:
    try:
        return dacite.from_dict(
            Config,
            toml.load(file),
            dacite.Config(type_hooks={enums.Environment: enums.Environment.__getitem__})
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
