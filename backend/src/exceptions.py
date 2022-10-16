import http
import traceback

from starlite import Request, Response, MediaType, HTTPException

from src.models import User, Error


__all__ = (
    "exception_handler",
)


def exception_handler(_: Request[User, str], exception: Exception) -> Response[Error]:

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
