import secrets
from typing import Annotated

import pydantic
from litestar import Response, post
from litestar.datastructures import Cookie
from litestar.params import Body
from litestar.status_codes import HTTP_400_BAD_REQUEST

from src.api.common import InvalidRequestResponse
from src.config import CONFIG
from src.enums import Environment
from src.exceptions import CustomException
from src.models import User
from src.types import Request, State


__all__ = ["login"]


class LoginData(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True)
    username: Annotated[
        str,
        pydantic.Field(min_length=1, max_length=32)
    ]
    password: str


@post(
    "/login",
    exclude_from_auth=True,
    responses={
        400: InvalidRequestResponse,
    },
    response_cookies=[
        Cookie(
            key="__session_id",
            description="The session id to use for authenticating requests.",
            documentation_only=True,
        )
    ]
)
async def login(
    request: Request,
    state: State,
    data: Annotated[
        LoginData,
        Body(description="The username and password to login with.")
    ]
) -> Response[User]:
    user = await User.fetch_by_name_and_password(
        state.database,
        name=data.username, password=data.password
    )
    if user is None:
        raise CustomException(
            HTTP_400_BAD_REQUEST,
            reason="Invalid username or password."
        )
    session_id = secrets.token_urlsafe(256)
    expiry_time = 60 * 60 * 24 * 14  # 14 days
    await request.app.stores.get("sessions").set(
        key=session_id,
        value=user.id,
        expires_in=expiry_time
    )
    print(await request.app.stores.get("sessions").get(session_id))
    return Response(
        content=user,
        cookies=[
            Cookie(
                key="__session_id",
                value=session_id,
                max_age=expiry_time,
                expires=expiry_time,
                secure=CONFIG.general.environment == Environment.PRODUCTION,
                httponly=CONFIG.general.environment == Environment.PRODUCTION,
                samesite="strict",
            )
        ]
    )


