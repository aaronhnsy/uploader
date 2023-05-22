import sys
import traceback

import aiohttp.web

from uploader import exceptions, objects
from uploader.types import Pool, Request, StreamHandler, StreamResponse


__all__ = [
    "exception_middleware",
    "authentication_middleware",
]


@aiohttp.web.middleware
async def exception_middleware(request: Request, handler: StreamHandler) -> StreamResponse:
    try:
        response = await handler(request)
    except Exception as exception:
        if isinstance(exception, exceptions.JSONException):
            raise exception
        elif isinstance(exception, aiohttp.web.HTTPException):
            raise exceptions.JSONException(exception)
        else:
            print(f"\n{''.join(lines := traceback.format_exception(exception))}", file=sys.stderr)
            raise exceptions.JSONException(
                aiohttp.web.HTTPInternalServerError,
                detail=lines[-1].strip()
            )
    return response


@aiohttp.web.middleware
async def authentication_middleware(request: Request, handler: StreamHandler) -> StreamResponse:
    token = request.headers.get("Authorization")
    if token is None:
        raise exceptions.JSONException(
            aiohttp.web.HTTPUnauthorized,
            detail="A valid token must be provided in the 'Authorization' header."
        )
    pool: Pool = request.app["pool"]
    request["user"] = await objects.User.get(pool, token)
    return await handler(request)
