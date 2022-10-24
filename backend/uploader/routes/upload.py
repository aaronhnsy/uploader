import pathlib
import random
import string
from typing import cast

import aiohttp.web
import aiohttp.multipart
import asyncpg

from uploader import exceptions, objects


__all__ = (
    "UploadView",
)


class UploadView(aiohttp.web.View):

    async def post(self) -> aiohttp.web.StreamResponse:

        if (expected := "multipart/form-data") != (received := self.request.content_type):
            raise exceptions.JsonException(
                aiohttp.web.HTTPBadRequest,
                f"Incorrect 'Content-Type' header received, expected '{expected}' but got '{received}'."
            )

        reader = await self.request.multipart()
        field = await reader.next()

        if not isinstance(field, aiohttp.multipart.BodyPartReader):
            raise exceptions.JsonException(aiohttp.web.HTTPBadRequest, "Multipart field data malformed.")
        if field.name != "file":
            raise exceptions.JsonException(aiohttp.web.HTTPBadRequest, "Multipart field name must be 'file'.")

        user = cast(objects.User, self.request["user"])
        pool = cast(asyncpg.Pool, self.request.app["pool"])

        file_name = "".join(random.sample(string.ascii_lowercase, 20))
        file_format = field.filename.split(".")[-1] if field.filename else "unknown"

        file_path = pathlib.Path(f"media/{user.id}/{file_format}/{file_name}.{file_format}")
        file_path.parent.mkdir(parents=True, exist_ok=True)

        with file_path.open(mode="wb") as file_io:
            while chunk := await field.read_chunk():
                file_io.write(chunk)

        data: objects.FileData = await pool.fetchrow(
            "INSERT INTO files (user_id, name, format, private) VALUES ($1, $2, $3, $4) RETURNING *",
            user.id, file_name, file_format, False
        )
        file = objects.File(**data)

        return aiohttp.web.json_response(file.info)
