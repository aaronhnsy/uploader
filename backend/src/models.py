from typing import Generic, TypeVar

from pydantic import BaseModel
from pydantic.generics import GenericModel


T = TypeVar("T")


class ExceptionResponse(BaseModel):
    status_code: int
    message: str
    detail: str | None


class PagedResponse(GenericModel, Generic[T]):
    total: int
    limit: int
    offset: int
    items: list[T]


class User(BaseModel):
    id: int
    username: str


class Token(BaseModel):
    token: str


class File(BaseModel):
    id: str
