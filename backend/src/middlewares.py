from typing import Any

from starlite import (
    AbstractAuthenticationMiddleware,
    AuthenticationResult,
    NotAuthorizedException, ASGIConnection,
)

from src.models import User
from src.utilities import get_asyncpg_pool


class AuthenticationMiddleware(AbstractAuthenticationMiddleware):

    async def authenticate_request(self, connection: ASGIConnection[Any, User, str]) -> AuthenticationResult:

        token = connection.headers.get("Authorization")
        if not token:
            raise NotAuthorizedException("'Authorization' header was not found.")

        pool = await get_asyncpg_pool(connection.state)

        data: User = await pool.fetchrow(
            "SELECT id, username, email, bot, permissions FROM users WHERE token = $1",
            token
        )
        if not data:
            raise NotAuthorizedException("Token provided in 'Authorization' header does not exist.")

        return AuthenticationResult(user=User.parse_obj(data), auth=token)
