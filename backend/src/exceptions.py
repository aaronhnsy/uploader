import http
import traceback
from typing import Annotated

import pydantic
from litestar import MediaType, Response
from litestar.exceptions import HTTPException
from litestar.status_codes import HTTP_500_INTERNAL_SERVER_ERROR

from src.config import CONFIG
from src.enums import Environment
from src.types import Request


__all__ = [
    "CustomException",
    "ExceptionData",
    "handle_custom_exception",
    "handle_http_exception",
    "handle_other_exception",
]


class CustomException(Exception):

    def __init__(self, status_code: int, /, *, reason: str) -> None:
        super().__init__(self)
        self.status_code: int = status_code
        self.reason: str = reason


class ExceptionData(pydantic.BaseModel):
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


def handle_custom_exception(request: Request, exception: CustomException) -> Response[dict[str, str | int | None]]:
    model = ExceptionData(
        status_code=exception.status_code,
        status_name=http.HTTPStatus(exception.status_code).phrase,
        reason=exception.reason,
    )
    return Response(
        media_type=MediaType.JSON,
        status_code=model.status_code,
        content=model.model_dump()
    )


def handle_http_exception(request: Request, exception: HTTPException) -> Response[dict[str, str | int | None]]:
    model = ExceptionData(
        status_code=exception.status_code,
        status_name=http.HTTPStatus(exception.status_code).phrase,
        reason=None,
    )
    return Response(
        media_type=MediaType.JSON,
        status_code=model.status_code,
        content=model.model_dump()
    )


def handle_other_exception(request: Request, exception: Exception) -> Response[dict[str, str | int | None]]:
    tb = traceback.format_exception(exception)
    print("".join(tb))
    model = ExceptionData(
        status_code=HTTP_500_INTERNAL_SERVER_ERROR,
        status_name=http.HTTPStatus(HTTP_500_INTERNAL_SERVER_ERROR).phrase,
        reason=tb[-1] if CONFIG.general.environment == Environment.DEVELOPMENT else None
    )
    return Response(
        media_type=MediaType.JSON,
        status_code=model.status_code,
        content=model.model_dump()
    )
