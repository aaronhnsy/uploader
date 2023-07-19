import aiohttp.web
import asyncpg
import dacite
import orjson

from uploader.objects import File
from uploader.types import Request, Response
from uploader.utilities import DACITE_CONFIG


__all__ = ["get_files"]


async def get_files(request: Request) -> Response:
    files: asyncpg.Record = await request.app["pool"].fetch(
        "SELECT * FROM files WHERE user_id = $1 ORDER BY user_id ASC",
        request["user"].id
    )
    return aiohttp.web.Response(
        content_type="application/json",
        text=orjson.dumps([dacite.from_dict(File, {**file}, config=DACITE_CONFIG) for file in files]).decode()
    )
