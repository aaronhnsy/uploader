import pathlib
import random
import string

import aiohttp.multipart
import aiohttp.web
import orjson

from uploader import decorators, exceptions
from uploader.objects import File, User
from uploader.types import Request, Response


__all__ = ["upload_file"]


@decorators.check_content_type("multipart/form-data")
async def upload_file(request: Request) -> Response:
    # get the multipart reader
    reader = await request.multipart()
    field = await reader.next()
    if not isinstance(field, aiohttp.multipart.BodyPartReader):
        raise exceptions.JSONException(
            aiohttp.web.HTTPBadRequest,
            detail="Multipart field data is malformed."
        )
    if field.name != "file":
        raise exceptions.JSONException(
            aiohttp.web.HTTPBadRequest,
            detail="Multipart field name must be 'file'."
        )
    # get the user and file info
    user: User = request["user"]
    name = "".join(random.sample(string.ascii_lowercase, 20))
    format = field.filename.split(".")[-1] if field.filename else "unknown"
    # save the file
    path = pathlib.Path(f"/home/axel/media/{user.id}/{format}/{name}.{format}")
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open(mode="wb") as file_io:
        while chunk := await field.read_chunk():
            file_io.write(chunk)
    # create and return the file info
    return aiohttp.web.Response(
        content_type="application/json",
        text=orjson.dumps(
            await File.create(
                request.app["pool"],
                user_id=user.id,
                name=name,
                format=format,
                private=False
            )
        ).decode()
    )
