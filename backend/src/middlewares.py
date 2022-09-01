from starlette.requests import HTTPConnection
from starlite import (
    AbstractAuthenticationMiddleware,
    AuthenticationResult,
    NotAuthorizedException,
)

from src.models import User, Token


class AuthenticationMiddleware(AbstractAuthenticationMiddleware):

    async def authenticate_request(self, connection: HTTPConnection) -> AuthenticationResult:

        if not (_ := connection.headers.get("Authorization")):
            raise NotAuthorizedException("No 'Authorization' header was provided.")

        return AuthenticationResult(
            user=User(id=0, username="Axel"),
            auth=Token(token="abcde")
        )
