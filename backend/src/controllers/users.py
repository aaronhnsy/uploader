from starlite import Controller, post, State

from src.models import User
from src.utilities import generate_snowflake


__all__ = (
    "UsersController",
)


class UsersController(Controller):
    path = "/users"

    @post()
    async def create_account(self, state: State) -> User:

        id = generate_snowflake()
