from starlite import Controller, get


__all__ = (
    "FileController",
)


class FileController(Controller):
    path = "/api/files"

    @get("/{file_id:int}")
    async def get(self) -> str:
        return "hello world"
