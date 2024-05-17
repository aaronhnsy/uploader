import secrets
from typing import Annotated

import pydantic
from litestar import post
from litestar.openapi import ResponseSpec
from litestar.params import Body

from src.exceptions import Error
from src.models import User
from src.routes.common import InvalidRequestResponse
from src.security import sign_token
from src.types import State


__all__ = ["create_token"]


class CreateTokenRequest(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True, extra="ignore")
    username: Annotated[
        str,
        pydantic.Field(
            description="The name of the user to create a token for.",
            min_length=1, max_length=32,
        )
    ]
    password: Annotated[
        str,
        pydantic.Field(description="The matching password for the user.")
    ]
    detail: Annotated[
        str,
        pydantic.Field(description="Extra information about the token's purpose.")
    ]


class CreateTokenResponse(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True, extra="ignore")
    token: Annotated[
        str,
        pydantic.Field(description="The newly created token.")
    ]


@post(
    path="/tokens",
    summary="Create Token",
    exclude_from_auth=True,
    responses={
        201: ResponseSpec(
            data_container=CreateTokenResponse, generate_examples=False,
            description="Response contains the newly created token."
        ),
        400: InvalidRequestResponse,
        401: ResponseSpec(
            data_container=Error, generate_examples=False,
            description="The provided username and/or password do not match an existing user."
        ),
    }
)
async def create_token(
    state: State,
    data: Annotated[
        CreateTokenRequest,
        Body(description="The token creation data.")
    ]
) -> CreateTokenResponse:
    user = await User.validate_username_and_password(
        state.postgresql,
        username=data.username, password=data.password
    )
    secret = secrets.token_hex(32)
    token = sign_token({"user_id": user.id, "secret": secret})
    await state.postgresql.execute(
        "INSERT INTO tokens (user_id, secret, detail) VALUES ($1, $2, $3)",
        user.id, secret, data.detail
    )
    return CreateTokenResponse(token=token)
