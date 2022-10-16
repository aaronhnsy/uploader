from pydantic import BaseModel

from .permissions import Permissions


__all__ = (
    "User",
)


class User(BaseModel):
    id: int
    username: str
    email: str
    bot: bool
    permissions: Permissions
