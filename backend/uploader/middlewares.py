import sys
import traceback

import aiohttp.web

from uploader.exceptions import JSONException
from uploader.types import Request, StreamHandler, StreamResponse


__all__ = ["exception_middleware"]


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
            print(f"\n{"".join(traceback.format_exception(exception))}", file=sys.stderr)
            raise JSONException(
                aiohttp.web.HTTPInternalServerError,
                detail=traceback.format_exception(exception)[-1].strip()
            )
    return response
