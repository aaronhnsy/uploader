from litestar import Router

from .create_session import create_session


__all__ = ["session_router"]


session_router = Router(
    path="/sessions",
    tags=["Sessions"],
    route_handlers=[create_session]
)
