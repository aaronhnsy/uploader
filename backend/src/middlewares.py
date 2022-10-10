from typing import Any

from starlite import (
    AbstractAuthenticationMiddleware,
    AuthenticationResult,
    NotAuthorizedException, ASGIConnection,
)

from src import enums, models


class AuthenticationMiddleware(AbstractAuthenticationMiddleware):

    async def authenticate_request(
        self,
        connection: ASGIConnection[Any, models.User, models.Token]
    ) -> AuthenticationResult:

        if not (authorization := connection.headers.get("Authorization")):
            raise NotAuthorizedException("No 'Authorization' header was provided.")

        # return user/token models based on the authorization header provided.

        return AuthenticationResult(
            user=models.User(id=0, username="Axel", level=enums.UserLevel.Owner),
            auth=models.Token(token="abcde")
        )
