import itsdangerous
from litestar.middleware import AbstractAuthenticationMiddleware, AuthenticationResult

from src.objects import User
from src.types import ASGIConnection
from src.utilities import unsign_token


__all__ = ["AuthenticationMiddleware"]


class AuthenticationMiddleware(AbstractAuthenticationMiddleware):

    async def authenticate_request(self, connection: ASGIConnection) -> AuthenticationResult:
        # return nothing if there is no token
        token = connection.headers.get("Authorization") or connection.cookies.get("__session_id")
        if token is None:
            return AuthenticationResult(user=None, auth=None)
        # attempt to unsign the token and find the user
        try:
            data = unsign_token(token)
        except itsdangerous.BadSignature:
            return AuthenticationResult(user=None, auth=None)
        else:
            user = await User.fetch_by_id(connection.app.state.database, data["user_id"])
            return AuthenticationResult(user=user, auth=None)
