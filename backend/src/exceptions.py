import http
import traceback
from collections.abc import Callable
from typing import Annotated, Any

import pydantic
from litestar import MediaType, Response
from litestar.exceptions import HTTPException
from litestar.status_codes import HTTP_500_INTERNAL_SERVER_ERROR

from src.config import CONFIG
from src.enums import Environment
from src.types import Request


__all__ = [
    "ReasonException",
    "Error",
    "exception_handlers",
]

type _ExceptionHandlerResponse = Response[dict[str, Any]]
type _ExceptionHandler[T: Exception] = Callable[[Request, T], _ExceptionHandlerResponse]
type _ExceptionHandlerMapping = \
    dict[
        type[ReasonException] | type[HTTPException] | type[Exception],
        _ExceptionHandler[ReasonException] | _ExceptionHandler[HTTPException] | _ExceptionHandler[Exception]
    ]


class ReasonException(Exception):

    def __init__(self, status_code: int, /, *, reason: str) -> None:
        super().__init__(self)
        self.status_code: int = status_code
        self.reason: str = reason


class Error(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True)
    status_code: Annotated[
        int,
        pydantic.Field(description="The status code of the response.")
    ]
    status_name: Annotated[
        str,
        pydantic.Field(description="The status name of the response.")
    ]
    reason: Annotated[
        str | None,
        pydantic.Field(description="The reason for the response.")
    ]


def handle_custom_exception(request: Request, exception: ReasonException) -> _ExceptionHandlerResponse:
    return Response(
        media_type=MediaType.JSON,
        status_code=exception.status_code,
        content=Error(
            status_code=exception.status_code,
            status_name=http.HTTPStatus(exception.status_code).phrase,
            reason=exception.reason,
        ).model_dump()
    )


def handle_http_exception(request: Request, exception: HTTPException) -> _ExceptionHandlerResponse:
    return Response(
        media_type=MediaType.JSON,
        status_code=exception.status_code,
        content=Error(
            status_code=exception.status_code,
            status_name=http.HTTPStatus(exception.status_code).phrase,
            reason=None,
        ).model_dump()
    )


def handle_other_exception(request: Request, exception: Exception) -> _ExceptionHandlerResponse:
    status_code = HTTP_500_INTERNAL_SERVER_ERROR
    tb = traceback.format_exception(exception)
    print("".join(tb))
    return Response(
        media_type=MediaType.JSON,
        status_code=status_code,
        content=Error(
            status_code=status_code,
            status_name=http.HTTPStatus(status_code).phrase,
            reason=tb[-1] if CONFIG.general.environment == Environment.DEVELOPMENT else None
        ).model_dump()
    )


exception_handlers: _ExceptionHandlerMapping = {
    ReasonException: handle_custom_exception,
    HTTPException:   handle_http_exception,
    Exception:       handle_other_exception,
}
