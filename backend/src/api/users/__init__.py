from litestar import Router

from .get_current_user import get_current_user


__all__ = ["users_router"]


users_router = Router(
    path="/users",
    tags=["Users"],
    route_handlers=[get_current_user]
)
