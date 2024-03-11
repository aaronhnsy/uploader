from typing import Annotated

from litestar import get
from litestar.openapi import ResponseSpec
from litestar.params import Body

from src.api.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse
from src.exceptions import ExceptionData
from src.models import User
from src.types import State


__all__ = ["get_user"]


@get(
    path="/{user_id:str}",
    summary="Get User",
    responses={
        200: ResponseSpec(
            data_container=User, generate_examples=False,
            description="Response contains the user with the given ID."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: ResponseSpec(
            data_container=ExceptionData, generate_examples=False,
            description="A user with the given ID does not exist."
        ),
    }
)
async def get_user(
    state: State,
    user_id: Annotated[
        str,
        Body(
            min_length=16, max_length=16,
            description="The id of the user to retrieve."
        )
    ]
) -> User:
    return await User.fetch_with_id(state.database, user_id)
