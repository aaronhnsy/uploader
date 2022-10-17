import pathlib
import random
import string

from starlite import (
    Controller, get, post, UploadFile, Body, RequestEncodingType, State, Request, NotFoundException,
    PermissionDeniedException,
)

from src.models import File, User
from src.utilities import get_asyncpg_pool, generate_snowflake


__all__ = (
    "FilesController",
)


MEDIA = pathlib.Path("./media")


class FilesController(Controller):
    path = "/files"

    @get(path="/{name:str}")
    async def get_one(
        self,
        request: Request[User, str],
        state: State,
        name: str
    ) -> File:

        pool = await get_asyncpg_pool(state)

        data: File = await pool.fetchrow("SELECT * FROM files WHERE name = $1", name)
        if not data:
            raise NotFoundException("File was not found.")

        file = File.parse_obj(data)
        if file.private is True and file.user_id != request.user.id:
            raise PermissionDeniedException("This file is private.")

        return File.parse_obj(file)

    @get()
    async def get_several(
        self,
        request: Request[User, str],
        state: State,
        names: list[str],
    ) -> list[File | None]:

        files: dict[str, File | None] = {}
        pool = await get_asyncpg_pool(state)

        for name in names:

            data: File = await pool.fetchrow("SELECT * FROM files WHERE name = $1", name)  # type: ignore
            if not data:
                files[name] = None
                continue

            file = File.parse_obj(data)

            if file.private is True and file.user_id != request.user.id:
                files[name] = None
                continue

            files[name] = file

        return files

    @post()
    async def post(
        self,
        request: Request[User, str],
        state: State,
        data: UploadFile = Body(media_type=RequestEncodingType.MULTI_PART)
    ) -> File:

        file_format = data.filename.split(".")[-1]

        path = MEDIA / str(request.user.id) / file_format
        path.mkdir(parents=True, exist_ok=True)

        file_name = "".join(random.sample(string.ascii_lowercase, 20))
        (path / f"{file_name}.{file_format}").write_bytes(await data.read())

        pool = await get_asyncpg_pool(state)

        file: File = await pool.fetchrow(
            "INSERT INTO files (id, user_id, name, format, private) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            generate_snowflake(), request.user.id, file_name, file_format, False
        )
        return File.parse_obj(file)
