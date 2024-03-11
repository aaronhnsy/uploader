from litestar import get

from src.models import User
from src.types import Request


__all__ = ["get_current_user"]


@get("/@me")
async def get_current_user(request: Request) -> User:
    return request.user
