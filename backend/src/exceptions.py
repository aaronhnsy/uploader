import http
import traceback

from pydantic import BaseModel
from starlite import Request, Response, MediaType, HTTPException

from src import models


__all__ = (
    "Error",
    "exception_handler"
)


class Error(BaseModel):
    status: int
    reason: str
    detail: str | None


def exception_handler(_: Request[models.User, models.Token], exception: Exception) -> Response[Error]:

    if isinstance(exception, HTTPException):
        status = exception.status_code
        reason = http.HTTPStatus(status).phrase
        detail = exception.detail if exception.detail != reason else None
    else:
        status = 500
        reason = http.HTTPStatus(status).phrase
        detail = "".join(traceback.format_exception(type(exception), exception, exception.__traceback__))

    return Response(
        Error(
            status=status,
            reason=reason,
            detail=detail
        ),
        status_code=status,
        media_type=MediaType.JSON,
    )
