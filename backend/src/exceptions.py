import http
import traceback

import pydantic
from litestar import MediaType, Response
from litestar.exceptions import HTTPException
from litestar.status_codes import HTTP_500_INTERNAL_SERVER_ERROR

from src.config import CONFIG
from src.enums import Environment
from src.types import Request


__all__ = [
    "UploaderException",
    "exception_handler"
]


class UploaderException(Exception):

    def __init__(
        self,
        status_code: int, /,
        *, reason: str
    ) -> None:
        super().__init__(self)
        self.status_code: int = status_code
        self.reason: str = reason


class ExceptionData(pydantic.BaseModel):
    status_code: int
    status_name: str
    reason: str | None
    traceback: str | None = None


def exception_handler(
    request: Request,
    exception: UploaderException | HTTPException | Exception
) -> Response[dict[str, int | str | None]]:
    data: dict[str, int | str | None] = {
        "status_code": None,
        "status_name": None,
        "reason":      None,
    }
    # set 'status_code' and 'reason' for custom exceptions
    if isinstance(exception, UploaderException):
        data["status_code"] = exception.status_code
        data["reason"] = exception.reason
    # set 'status_code' for http exceptions that aren't 500
    elif isinstance(exception, HTTPException) and exception.status_code != HTTP_500_INTERNAL_SERVER_ERROR:
        data["status_code"] = exception.status_code
    # set 'status_code' and 'traceback' (if not in production mode) for all other exceptions
    else:
        data["status_code"] = HTTP_500_INTERNAL_SERVER_ERROR
        if CONFIG.general.environment != Environment.PRODUCTION:
            data["traceback"] = f"\n{"".join(traceback.format_exception(exception))}"
    # set 'status_name' based on 'status_code'
    data["status_name"] = http.HTTPStatus(data["status_code"]).phrase
    # return a json response
    return Response(
        media_type=MediaType.JSON,
        status_code=data["status_code"],
        content=ExceptionData.model_validate(data).model_dump(exclude_unset=True)
    )
