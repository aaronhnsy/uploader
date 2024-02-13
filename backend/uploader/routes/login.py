import dataclasses

import aiohttp.web
import orjson

from uploader.decorators import check_content_type, ensure_data_matches, load_json_data
from uploader.objects import User
from uploader.types import Request, Response


__all__ = ["login"]


@dataclasses.dataclass
class LoginRequestData:
    email: str
    password: str


@check_content_type("application/json")
@load_json_data
@ensure_data_matches(LoginRequestData)
async def login(request: Request) -> Response:
    return aiohttp.web.Response(
        content_type="application/json",
        text=orjson.dumps(
            await User.get_from_email_and_password(
                request.app["pool"],
                request["data"]["email"],
                request["data"]["password"]
            )
        ).decode()
    )

