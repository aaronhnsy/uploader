from starlite import Controller


__all__ = (
    "FilesController",
)


class FilesController(Controller):
    path = "/files"
