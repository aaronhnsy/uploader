from litestar import Router

from .files import files_router
from .sessions import sessions_router
from .tokens import tokens_router
from .users import users_router


__all__ = ["api_router"]


api_router = Router(
    path="/api",
    route_handlers=[files_router, sessions_router, tokens_router, users_router]
)
