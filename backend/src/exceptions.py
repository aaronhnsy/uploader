from starlite import Request, Response, MediaType, HTTPException

from src.models import ExceptionResponse, User, Token


def exception_formatter(_: Request[User, Token], exception: Exception) -> Response[ExceptionResponse]:

    if isinstance(exception, HTTPException):
        status_code = exception.status_code
        message = exception.detail or "Internal Server Error"
        detail = exception.extra.get("detail") if isinstance(exception.extra, dict) else None
    else:
        status_code = 500
        message = "Internal Server Error"
        detail = None

    return Response(
        content=ExceptionResponse(
            status_code=status_code,
            message=message,
            detail=detail
        ),
        status_code=status_code,
        media_type=MediaType.JSON,
    )
