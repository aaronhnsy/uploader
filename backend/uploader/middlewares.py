import sys
import traceback

import aiohttp.web

from uploader.exceptions import JSONException
from uploader.objects import User
from uploader.types import Request, StreamHandler, StreamResponse


__all__ = [
    "exception_middleware",
    "authentication_middleware",
]


@aiohttp.web.middleware
async def exception_middleware(request: Request, handler: StreamHandler) -> StreamResponse:
    try:
        response = await handler(request)
    except Exception as exception:
        if isinstance(exception, JSONException):
            raise exception
        elif isinstance(exception, aiohttp.web.HTTPException):
            raise JSONException(exception)
        else:
            print(f"\n{''.join(lines := traceback.format_exception(exception))}", file=sys.stderr)
            raise JSONException(
                aiohttp.web.HTTPInternalServerError,
                detail=lines[-1].strip()
            )
    return response


@aiohttp.web.middleware
async def authentication_middleware(request: Request, handler: StreamHandler) -> StreamResponse:
    if (token := request.headers.get("Authorization")) is None:
        raise JSONException(
            aiohttp.web.HTTPUnauthorized,
            detail="The 'Authorization' header must contain a token."
        )
    request["user"] = await User.get(
        request.app["pool"],
        token
    )
    return await handler(request)
