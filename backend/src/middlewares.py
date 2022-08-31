from starlette.requests import HTTPConnection
from starlite import (
    AbstractAuthenticationMiddleware,
    AuthenticationResult,
    NotAuthorizedException,
    PermissionDeniedException,
    Response,
)

from src.exceptions import exception_handler
from src.models import User, Token, Error


class AuthenticationMiddleware(AbstractAuthenticationMiddleware):

    async def authenticate_request(self, request: HTTPConnection) -> AuthenticationResult:

        if not (_ := request.headers.get("Authorization")):
            raise NotAuthorizedException("No 'Authorization' header was provided.")

        return AuthenticationResult(
            user=User(id=0, username="Axel"),
            auth=Token(token="abcde")
        )

    # TODO: Remove the following method when starlite releases fix for exception handlers

    def create_error_response(self, exc: NotAuthorizedException | PermissionDeniedException) -> Response[Error]:
        return exception_handler(request=None, exception=exc)  # type: ignore
