from litestar import Router

from .generate_token import generate_token


__all__ = ["tokens_router"]


tokens_router = Router(
    path="/tokens",
    tags=["Tokens"],
    route_handlers=[generate_token]
)
