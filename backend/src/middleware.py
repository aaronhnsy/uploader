import itsdangerous
from litestar.middleware import AbstractAuthenticationMiddleware, AuthenticationResult, DefineMiddleware
from litestar.status_codes import HTTP_401_UNAUTHORIZED

from src.exceptions import CustomException
from src.models import User
from src.types import Connection
from src.utilities import unsign_token


__all__ = ["AuthenticationMiddleware"]


class _AuthenticationMiddleware(AbstractAuthenticationMiddleware):

    async def authenticate_request(self, connection: Connection) -> AuthenticationResult:
        # check if the 'Authorization' header is present
        token = connection.headers.get("Authorization")
        if token is None:
            raise CustomException(
                HTTP_401_UNAUTHORIZED,
                reason="You must provide a token in the 'Authorization' header."
            )
        # unsign the token and get the user id
        try:
            data = unsign_token(token)
        except itsdangerous.BadSignature:
            raise CustomException(
                HTTP_401_UNAUTHORIZED,
                reason="The provided token is invalid."
            )

        # valid: asyncpg.Record | None = await connection.app.state.database.fetchrow(
        #     "SELECT * FROM tokens WHERE user_id = $1 AND secret = $2",
        #     data["user_id"], data["secret"]
        # )
        # if valid is None:
        #     raise CustomException(
        #         HTTP_401_UNAUTHORIZED,
        #         reason="The token provided is invalid."
        #     )

        # fetch the user from the database; TODO: use a cache
        user = await User.fetch_by_id(connection.app.state.database, data["user_id"])
        if user is None:
            raise CustomException(
                HTTP_401_UNAUTHORIZED,
                reason="The user associated with the provided token does not exist."
            )
        # return the user
        return AuthenticationResult(user=user, auth=None)


AuthenticationMiddleware = DefineMiddleware(_AuthenticationMiddleware, exclude="schema")
