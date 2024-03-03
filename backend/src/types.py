from typing import TYPE_CHECKING

import asyncpg
from litestar import Request as _Request
from litestar.connection import ASGIConnection
from litestar.datastructures import State as _State
from litestar.handlers.http_handlers import HTTPRouteHandler


if TYPE_CHECKING:
    from src.models import User


__all__ = [
    "Database",
    "Connection",
    "Request",
    "State",
]


type Database = asyncpg.Pool[asyncpg.Record]
type Connection = ASGIConnection[HTTPRouteHandler, User, None, State]
type Request = _Request[User, None, State]


class State(_State):
    database: Database
