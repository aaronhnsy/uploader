from starlite import Controller, get, Request

from src.models import User


__all__ = (
    "MeController",
)


class MeController(Controller):
    path = "/@me"

    @get()
    async def get(self, request: Request[User, str]) -> User:
        return request.user
