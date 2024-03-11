from litestar import Router

from .get_current_user import get_current_user
from .get_user import get_user


__all__ = ["users_router"]


users_router = Router(
    path="/users",
    tags=["Users"],
    security=[{"token": []}],
    route_handlers=[get_current_user, get_user]
)
