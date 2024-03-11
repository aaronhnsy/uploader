import secrets
from typing import Annotated

import pydantic
from litestar import post
from litestar.params import Body
from litestar.status_codes import HTTP_400_BAD_REQUEST

from src.api.common import InvalidRequestResponseSpec
from src.exceptions import ReasonException
from src.models import User
from src.types import Request, State
from src.utilities import sign_token


__all__ = ["create_token"]


class CreateTokenRequest(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True)
    username: Annotated[
        str,
        pydantic.Field(min_length=1, max_length=32)
    ]
    password: str


@post(
    path="/",
    exclude_from_auth=True,
    summary="Create Token",
    responses={
        400: InvalidRequestResponseSpec,
    }
)
async def create_token(
    request: Request,
    state: State,
    data: Annotated[
        CreateTokenRequest,
        Body(description="The username and password to generate a token for.")
    ]
) -> str:
    user = await User.fetch_by_name_and_password(
        state.postgresql,
        name=data.username, password=data.password
    )
    if user is None:
        raise ReasonException(
            HTTP_400_BAD_REQUEST,
            reason="Invalid username or password."
        )
    secret = secrets.token_hex(16)
    await state.postgresql.execute(
        "INSERT INTO tokens (user_id, secret) VALUES ($1, $2)",
        user.id, secret
    )
    return sign_token({"user_id": user.id, "secret": secret})
