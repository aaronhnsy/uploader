import secrets
from typing import Annotated

import itsdangerous
import pydantic
from litestar import delete
from litestar.openapi import ResponseSpec
from litestar.params import Body
from litestar.status_codes import HTTP_400_BAD_REQUEST

from src.api.common import InvalidRequestResponseSpec
from src.exceptions import Error, ReasonException
from src.objects import User
from src.security import sign_token, unsign_token
from src.types import State


__all__ = ["create_token"]


class InvalidateTokenRequest(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True)
    token: Annotated[
        str,
        pydantic.Field(description="The token to invalidate.")
    ]


@delete(
    path="/",
    exclude_from_auth=True,
    summary="Invalidate Token",
    responses={
        204: ResponseSpec(
            data_container=None, generate_examples=False,
            description="The token was successfully invalidated."
        ),
        400: InvalidRequestResponseSpec,
    }
)
async def invalidate_token(
    state: State,
    data: Annotated[
        InvalidateTokenRequest,
        Body(description="The token to invalidate.")
    ]
) -> None:
    try:
        token_data = unsign_token(data.token)
    except itsdangerous.BadSignature:
        raise ReasonException(
            HTTP_400_BAD_REQUEST,
            reason="The token is invalid.",
        )
    await state.postgresql.execute(
        "DELETE FROM tokens WHERE user_id = $1 and secret = $2",
        token_data["user_id"], token_data["secret"]
    )
