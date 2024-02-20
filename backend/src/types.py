from typing import TYPE_CHECKING

import asyncpg
from litestar import Request as _Request
from litestar.connection import ASGIConnection as _ASGIConnection
from litestar.datastructures import State as _State
from litestar.handlers.http_handlers import HTTPRouteHandler as _HTTPRouteHandler


if TYPE_CHECKING:
    from src.objects import User


__all__ = [
    "Database",
    "ASGIConnection",
    "Request",
    "State",
]


type Database = asyncpg.Pool[asyncpg.Record]
type ASGIConnection = _ASGIConnection[_HTTPRouteHandler, User, str, State]
type Request = _Request[User | None, str, State]


class State(_State):
    database: Database
