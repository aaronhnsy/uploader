from litestar import Router

from .login import login


__all__ = ["session_router"]


session_router = Router(
    path="/session",
    tags=["Session"],
    route_handlers=[login]
)
