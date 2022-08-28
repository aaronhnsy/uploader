from starlette.requests import HTTPConnection
from starlite import (
    AbstractAuthenticationMiddleware,
    AuthenticationResult,
    NotAuthorizedException,
    Response,
    MediaType,
    PermissionDeniedException,
)

from src.models import User, Token, ExceptionResponse


class AuthenticationMiddleware(AbstractAuthenticationMiddleware):

    async def authenticate_request(self, request: HTTPConnection) -> AuthenticationResult:

        if not (token := request.headers.get("Authorization")):
            raise NotAuthorizedException(extra={"detail": "No 'Authorization' header was provided."})

        return AuthenticationResult(
            user=User(id=0, username="Axel"),
            auth=Token(token=token)
        )

    def create_error_response(
        self,
        exc: NotAuthorizedException | PermissionDeniedException
    ) -> Response[ExceptionResponse]:

        return Response(
            content=ExceptionResponse(
                status_code=exc.status_code,
                message=exc.detail or "Internal Server Error",
                detail=exc.extra.get("detail") if isinstance(exc.extra, dict) else None,
            ),
            status_code=exc.status_code,
            media_type=MediaType.JSON,
        )
