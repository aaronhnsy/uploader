from litestar import Router

from .files import files_router
from .tokens import tokens_router


__all__ = ["api_router"]


api_router = Router(
    path="/api",
    route_handlers=[files_router, tokens_router]
)
