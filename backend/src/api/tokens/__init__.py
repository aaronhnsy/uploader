from litestar import Router

from .create_token import create_token
from .invalidate_token import invalidate_token


__all__ = ["tokens_router"]


tokens_router = Router(
    path="/tokens",
    tags=["Tokens"],
    route_handlers=[create_token, invalidate_token]
)
