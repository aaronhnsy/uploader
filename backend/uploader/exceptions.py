import http
import json

import aiohttp.web


__all__ = (
    "JsonException",
)


class JsonException(aiohttp.web.HTTPException):

    def __init__(
        self,
        exception: type[aiohttp.web.HTTPException] | aiohttp.web.HTTPException,
        detail: str | None = None
    ) -> None:
        aiohttp.web.Response.__init__(
            self,
            headers={
                "Content-Type": "application/json"
            },
            body=json.dumps(
                {
                    "status": exception.status_code,
                    "reason": http.HTTPStatus(exception.status_code).phrase,
                    "detail": detail
                }
            )
        )
        Exception.__init__(self)
