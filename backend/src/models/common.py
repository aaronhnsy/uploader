from typing import TypeVar, Generic

from pydantic.generics import GenericModel


__all__ = (
    "PagedItem",
    "PagedResponse",
)


PagedItem = TypeVar("PagedItem")


class PagedResponse(GenericModel, Generic[PagedItem]):
    total: int
    limit: int
    offset: int
    items: list[PagedItem]
