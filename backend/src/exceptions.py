import traceback
import http

from starlite import Request, Response, MediaType, HTTPException

from src.models import User, Token, Error, ErrorData


def exception_formatter(request: Request[User, Token], exception: Exception) -> Response[Error]:

    if isinstance(exception, HTTPException):
        status_code = exception.status_code
        reason = http.HTTPStatus(status_code).phrase
        detail = exception.detail if exception.detail != reason else None
    else:
        status_code = 500
        reason = "Internal Server Error"
        detail = "".join(traceback.format_exception(type(exception), exception, exception.__traceback__))

    return Response(
        Error(
            error=ErrorData(
                status_code=status_code,
                reason=reason,
                detail=detail
            )
        ),
        status_code=status_code,
        media_type=MediaType.JSON,
    )
