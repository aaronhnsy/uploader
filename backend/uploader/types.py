from __future__ import annotations

from collections.abc import Awaitable, Callable
from typing import Any, ClassVar, NewType, Protocol, TypeAlias

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
Request: TypeAlias = aiohttp.web.Request
Response: TypeAlias = aiohttp.web.Response
Handler: TypeAlias = Callable[[Request], Awaitable[Response]]
StreamResponse: TypeAlias = aiohttp.web.StreamResponse
StreamHandler: TypeAlias = Callable[[Request], Awaitable[StreamResponse]]

# asyncpg
Pool: TypeAlias = "asyncpg.Pool[asyncpg.Record]"

# custom
Colour = NewType("Colour", str)
FileSize = NewType("FileSize", int)


class Dataclass(Protocol):
    __dataclass_fields__: ClassVar[dict[str, Any]]
