import asyncpg
import itsdangerous
from litestar.middleware import AbstractAuthenticationMiddleware, AuthenticationResult, DefineMiddleware
from litestar.status_codes import HTTP_401_UNAUTHORIZED

from src.exceptions import ReasonException
from src.objects import User
from src.security import unsign_token
from src.types import Connection, State


__all__ = ["AuthenticationMiddleware"]


class _AuthenticationMiddleware(AbstractAuthenticationMiddleware):

    async def authenticate_request(self, connection: Connection) -> AuthenticationResult:
        state: State = connection.app.state  # pyright: ignore

        token = connection.headers.get("Authorization")
        if token is None:
            raise ReasonException(
                HTTP_401_UNAUTHORIZED,
                reason="You must provide a token in the 'Authorization' header."
            )

        try:
            data = unsign_token(token)
            valid: asyncpg.Record | None = await state.postgresql.fetchrow(
                "SELECT * FROM tokens WHERE user_id = $1 AND secret = $2",
                data["user_id"], data["secret"]
            )
            if valid is None:
                raise ValueError
        except (itsdangerous.BadSignature, ValueError):
            raise ReasonException(
                HTTP_401_UNAUTHORIZED,
                reason="The provided token is invalid."
            )

        user = await User.fetch_by_id(state.postgresql, data["user_id"])
        return AuthenticationResult(user=user, auth=None)


# class _AuthenticationMiddleware(AbstractAuthenticationMiddleware):
#
#     async def authenticate_request(self, connection: Connection) -> AuthenticationResult:
#         session_id = connection.cookies.get("__session_id")
#         if session_id is None:
#             raise ReasonException(
#                 HTTP_401_UNAUTHORIZED,
#                 reason="You must provide a session id in the '__session_id' cookie."
#             )
#         user_id = await connection.app.stores.get("sessions").get(session_id)
#         if user_id is None:
#             raise ReasonException(
#                 HTTP_401_UNAUTHORIZED,
#                 reason="The session id provided is invalid."
#             )
#         user = await User.fetch_by_id(connection.app.state.postgresql, user_id.decode())
#         return AuthenticationResult(user=user, auth=None)


AuthenticationMiddleware = DefineMiddleware(_AuthenticationMiddleware, exclude="schema")
