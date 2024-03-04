from litestar import Router

from .delete_file import delete_file
from .get_file import get_file
from .upload_file import upload_file


__all__ = ["files_router"]


files_router = Router(
    path="/files",
    tags=["Files"],
    security=[{"token": []}],
    route_handlers=[get_file, upload_file, delete_file]
)
