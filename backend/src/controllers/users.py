from starlite import Controller, post

from src.enums import UserLevel
from src.models import User
from src.types import State
from src.utilities import generate_snowflake


__all__ = (
    "UsersController",
)


class UsersController(Controller):
    path = "/users"

    @post()
    async def create_account(self, state: State) -> User:
        _ = generate_snowflake()
        return User(id=0, username="bruh", level=UserLevel.Owner)
