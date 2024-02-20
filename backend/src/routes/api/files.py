import asyncpg
from litestar import Controller, get
from litestar.status_codes import HTTP_401_UNAUTHORIZED

from src.exceptions import UploaderException
from src.objects import File
from src.types import Request, State


__all__ = ["FilesController"]


class FilesController(Controller):
    path = "/files"

    @get("/")
    async def get_files(self, request: Request, state: State) -> list[File]:
        if not request.user:
            raise UploaderException(
                HTTP_401_UNAUTHORIZED,
                reason="You must pass a valid token in the 'Authorization' header or "
                       "'__session_id' cookie to use this."
            )
        files: list[asyncpg.Record] = await state.database.fetch(  # pyright: ignore
            "SELECT * FROM files WHERE user_id = $1 ORDER BY user_id",
            request.user.id
        )
        return [File.model_validate({**file}) for file in files]
