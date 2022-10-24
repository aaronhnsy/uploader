import enum
from typing import TypedDict
from typing_extensions import Unpack


__all__ = (
    "Permissions",
    "UserData",
    "User"
)


class Permissions(enum.Flag):
    CREATE_FILES = enum.auto()


class UserData(TypedDict):
    id: int
    username: str
    email: str
    bot: bool
    permissions: int


class User:

    def __init__(self, **data: Unpack[UserData]) -> None:
        self.id: int = data["id"]
        self.username: str = data["username"]
        self.email: str = data["email"]
        self.bot: bool = data["bot"]
        self.permissions: Permissions = Permissions(data["permissions"])
