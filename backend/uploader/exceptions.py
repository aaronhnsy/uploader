import http

import aiohttp.web
import orjson


__all__ = ["JSONException"]


class JSONException(aiohttp.web.HTTPException):

    def __init__(
        self,
        exception: type[aiohttp.web.HTTPException] | aiohttp.web.HTTPException, /,
        *, detail: str | None = None
    ) -> None:
        aiohttp.web.Response.__init__(
            self,
            content_type="application/json",
            text=orjson.dumps(
                {
                    "status": exception.status_code,
                    "reason": http.HTTPStatus(exception.status_code).phrase,
                    "detail": detail
                }
            ).decode()
        )
        Exception.__init__(self)
