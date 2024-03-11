import secrets
from typing import Annotated

import pydantic
from litestar import post
from litestar.openapi import ResponseSpec
from litestar.params import Body

from src.api.common import InvalidRequestResponseSpec
from src.exceptions import Error
from src.models import User
from src.types import Request, State


__all__ = ["create_session"]


class CreateSessionRequest(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True)
    username: Annotated[
        str,
        pydantic.Field(min_length=1, max_length=32)
    ]
    password: str


@post(
    path="/",
    exclude_from_auth=True,
    summary="Create Session",
    responses={
        201: ResponseSpec(
            data_container=str, generate_examples=False,
            description="Response contains the newly created session id."
        ),
        400: InvalidRequestResponseSpec,
        401: ResponseSpec(
            data_container=Error, generate_examples=False,
            description="The username doesn't match an existing user or the password is incorrect."
        )
    },
)
async def create_session(
    request: Request,
    state: State,
    data: Annotated[
        CreateSessionRequest,
        Body(description="The username and password to create a session for.")
    ]
) -> str:
    user = await User.fetch_with_username_and_password(
        state.postgresql,
        name=data.username,
        password=data.password
    )
    session_id = secrets.token_urlsafe(256)
    await request.app.stores.get("sessions").set(
        key=session_id,
        value=user.id,
        expires_in=60 * 60 * 24 * 14  # 14 days
    )
    return session_id
