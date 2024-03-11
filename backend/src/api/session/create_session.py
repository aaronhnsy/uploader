import secrets
from typing import Annotated

import pydantic
from litestar import post
from litestar.openapi import ResponseSpec
from litestar.params import Body

from src.api.common import InvalidRequestResponse, UserNotFoundOrPasswordNotMatchedResponse
from src.models import User
from src.types import Request, State


__all__ = ["create_session"]


class CreateSessionRequestData(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True)
    username: Annotated[
        str,
        pydantic.Field(min_length=1, max_length=32)
    ]
    password: str


class CreateSessionResponseData(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True)
    session_id: Annotated[
        str,
        pydantic.Field(description="A session id that can be used to authenticate the user by providing it as a cookie.")
    ]
    user: Annotated[
        User,
        pydantic.Field(description="The user that the session was created for.")
    ]


@post(
    "/",
    exclude_from_auth=True,
    responses={
        201: ResponseSpec(
            data_container=CreateSessionResponseData, generate_examples=False,
            description="The session was created successfully."
        ),
        400: InvalidRequestResponse,
        401: UserNotFoundOrPasswordNotMatchedResponse,
    },
)
async def create_session(
    request: Request,
    state: State,
    data: Annotated[
        CreateSessionRequestData,
        Body(description="The username and password to create a session for.")
    ]
) -> CreateSessionResponseData:
    user = await User.fetch_with_username_and_password(
        state.database,
        name=data.username,
        password=data.password
    )
    session_id = secrets.token_urlsafe(256)
    await request.app.stores.get("sessions").set(
        key=session_id,
        value=user.id,
        expires_in=60 * 60 * 24 * 14  # 14 days
    )
    return CreateSessionResponseData(
        session_id=session_id,
        user=user
    )


