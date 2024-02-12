from collections.abc import Awaitable, Callable
from typing import Any, ClassVar, NewType, Protocol

import aiohttp.web
import asyncpg


__all__ = [
    "Request",
    "Response",
    "Handler",
    "StreamResponse",
    "StreamHandler",
    "Pool",
    "Colour",
    "FileSize",
    "Dataclass",
]


# aiohttp
type Request = aiohttp.web.Request
type Response = aiohttp.web.Response
type Handler = Callable[[Request], Awaitable[Response]]
type StreamResponse = aiohttp.web.StreamResponse
type StreamHandler = Callable[[Request], Awaitable[StreamResponse]]

# asyncpg
type Pool = asyncpg.Pool[asyncpg.Record]

# custom
Colour = NewType("Colour", str)
FileSize = NewType("FileSize", int)


class Dataclass(Protocol):
    __dataclass_fields__: ClassVar[dict[str, Any]]
