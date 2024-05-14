import enum


__all__ = [
    "Environment",
    "Permissions",
]


class Environment(enum.Enum):
    PRODUCTION = 0
    DEVELOPMENT = 1


class Permissions(enum.Flag):
    CREATE_UPLOADS = enum.auto()
