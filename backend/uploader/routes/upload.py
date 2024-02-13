import pathlib

import aiohttp.multipart
import aiohttp.web
import orjson

from uploader.config import CONFIG
from uploader.decorators import authenticate_user, check_content_type
from uploader.enums import Environment
from uploader.exceptions import JSONException
from uploader.objects import File, User
from uploader.types import Request, Response
from uploader.utilities import generate_id


__all__ = ["upload_file"]


if CONFIG.general.environment == Environment.PRODUCTION:
    _path = pathlib.Path("/home/axel/media/")
else:
    _path = pathlib.Path("media/")

MEDIA = _path


@authenticate_user
@check_content_type("multipart/form-data")
async def upload_file(request: Request) -> Response:
    # get the multipart reader
    if request.can_read_body is False:
        raise JSONException(
            aiohttp.web.HTTPBadRequest,
            detail="Request body must not be empty."
        )
    reader = await request.multipart()
    field = await reader.next()
    if not isinstance(field, aiohttp.multipart.BodyPartReader):
        raise JSONException(
            aiohttp.web.HTTPBadRequest,
            detail="Multipart field data is malformed."
        )
    if field.name != "file":
        raise JSONException(
            aiohttp.web.HTTPBadRequest,
            detail="Multipart field name must be 'file'."
        )
    # get the user and file info
    user: User = request["user"]
    name = generate_id()
    format = field.filename.split(".")[-1] if field.filename else "unknown"
    # save the file
    path = MEDIA / f"{user.id}" / f"{format}" / f"{name}.{format}"
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
                hidden=False,
            )
        ).decode()
    )
