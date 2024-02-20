from litestar import Router

from .files import FilesController


__all__ = ["api_router"]


api_router = Router(
    path="/api",
    route_handlers=[
        FilesController
    ]
)
