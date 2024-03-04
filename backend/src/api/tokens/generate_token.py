from typing import Annotated

import pydantic
from litestar import post
from litestar.params import Body

from src.api.common import InvalidRequestResponse
from src.types import Request, State


__all__ = ["generate_token"]


class GenerateTokenData(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True)
    username: str
    password: str


@post(
    "/",
    exclude_from_auth=True,
    responses={
        400: InvalidRequestResponse,
    }
)
async def generate_token(
    request: Request,
    state: State,
    data: Annotated[
        GenerateTokenData,
        Body(description="The username and password to generate a token for.")
    ]
) -> str:
    return "token"
