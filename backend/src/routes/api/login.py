import aiohttp.web
import asyncpg
import orjson
import pydantic
from uploader.decorators import check_content_type
from uploader.exceptions import JSONException
from uploader.objects import User
from uploader.types import Request, Response


__all__ = ["login"]


class LoginRequestData(pydantic.BaseModel):
    name: str = pydantic.Field(min_length=1, max_length=32)
    password: str


@check_content_type("application/json")
async def login(request: Request) -> Response:
    # validate the request data
    request_data = LoginRequestData.model_validate(await request.json())
    # attempt to fetch the user from the database
    user_data: asyncpg.Record | None = await request.app["pool"].fetchrow(
        "SELECT id, name, bot, permissions "
        "FROM users "
        "WHERE name = $1 and password = crypt($2, password)",
        request_data.name, request_data.password
    )
    if user is None:
        return JSONException(
            aiohttp.web.HTTPNotFound,
            detail="A user with that name and password combination does not exist."
        )



    return aiohttp.web.Response(
        content_type="application/json",
        text=orjson.dumps(
            await User.get_from_email_and_password(
                request.app["pool"],
                data.email,
                data.password,
            )
        ).decode()
    )
