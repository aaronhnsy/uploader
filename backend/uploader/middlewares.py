from collections.abc import Awaitable, Callable
from typing import cast

import aiohttp.web
import asyncpg

from uploader import exceptions, objects


__all__ = (
    "authentication_middleware",
    "exception_handler_middleware"
)


@aiohttp.web.middleware
async def exception_handler_middleware(
    request: aiohttp.web.Request,
    handler: Callable[[aiohttp.web.Request], Awaitable[aiohttp.web.StreamResponse]]
) -> aiohttp.web.StreamResponse:

    try:
        response = await handler(request)
    except aiohttp.web.HTTPException as exception:
        if isinstance(exception, exceptions.JsonException):
            return exception
        raise exceptions.JsonException(exception)

    return response


@aiohttp.web.middleware
async def authentication_middleware(
    request: aiohttp.web.Request,
    handler: Callable[[aiohttp.web.Request], Awaitable[aiohttp.web.StreamResponse]]
) -> aiohttp.web.StreamResponse:

    token = request.headers.get("Authorization")
    if not token:
        raise exceptions.JsonException(
            aiohttp.web.HTTPUnauthorized,
            "A valid token must be provided in the 'Authorization' header."
        )

    pool = cast(asyncpg.Pool, request.app["pool"])

    data: objects.UserData = await pool.fetchrow(
        "SELECT id, username, email, bot, permissions FROM users WHERE token = $1",
        token
    )
    if not data:
        raise exceptions.JsonException(
            aiohttp.web.HTTPUnauthorized,
            "The token provided in the 'Authorization' header does not exist."
        )

    request["user"] = objects.User(**data)
    return await handler(request)
