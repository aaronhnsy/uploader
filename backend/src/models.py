from typing import Generic, TypeVar

from pydantic import BaseModel
from pydantic.generics import GenericModel

from src import enums


__all__ = (
    "PagedResponse",
    "User",
    "Token",
    "File"
)


PagedItem = TypeVar("PagedItem")


class PagedResponse(GenericModel, Generic[PagedItem]):
    total: int
    limit: int
    offset: int
    items: list[PagedItem]


class User(BaseModel):
    id: int
    username: str
    level: enums.UserLevel


class Token(BaseModel):
    token: str


class File(BaseModel):
    id: str
