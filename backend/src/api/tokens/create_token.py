import secrets
from typing import Annotated

import pydantic
from litestar import post
from litestar.openapi import ResponseSpec
from litestar.params import Body

from src.api.common import InvalidRequestResponseSpec
from src.exceptions import Error
from src.objects import User
from src.security import sign_token
from src.types import State


__all__ = ["create_token"]


class CreateTokenRequest(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True)
    username: Annotated[
        str,
        pydantic.Field(
            min_length=1, max_length=32,
            description="The username to create a token for."
        )
    ]
    password: Annotated[
        str,
        pydantic.Field(description="The matching password for the username.")
    ]
    detail: Annotated[
        str,
        pydantic.Field(description="Extra detail about the token being created.")
    ]


class CreateTokenResponse(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True)
    token: Annotated[
        str,
        pydantic.Field(description="The newly created token.")
    ]


@post(
    path="/",
    exclude_from_auth=True,
    summary="Create Token",
    responses={
        201: ResponseSpec(
            data_container=CreateTokenResponse, generate_examples=False,
            description="Response contains the newly created token."
        ),
        400: InvalidRequestResponseSpec,
        401: ResponseSpec(
            data_container=Error, generate_examples=False,
            description="The username doesn't match an existing user or the password is incorrect."
        )
    }
)
async def create_token(
    state: State,
    data: Annotated[
        CreateTokenRequest,
        Body(description="The information needed to create a token.")
    ]
) -> CreateTokenResponse:
    user = await User.fetch_with_username_and_password(
        state.postgresql,
        name=data.username,
        password=data.password
    )
    secret = secrets.token_hex(16)
    token = sign_token({"user_id": user.id, "secret": secret})
    await state.postgresql.execute(
        "INSERT INTO tokens (user_id, secret, detail) VALUES ($1, $2, $3)",
        user.id, secret, data.detail
    )
    return CreateTokenResponse(token=token)
