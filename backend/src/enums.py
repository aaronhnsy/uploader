from enum import Enum


__all__ = (
    "Environment",
    "UserLevel"
)


class Environment(Enum):
    PRODUCTION = 0
    DEVELOPMENT = 1


class UserLevel(Enum):
    User = 0
    Admin = 1
    Owner = 2
