from litestar import get
from litestar.openapi import ResponseSpec

from src.objects import User
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse, UserIDParameter
from src.routes.common import UserNotFoundResponse
from src.types import State


__all__ = ["get_user"]


@get(
    path="/users/{user_id:str}",
    summary="Get User",
    responses={
        200: ResponseSpec(
            data_container=User, generate_examples=False,
            description="Response contains the user with the given ID."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: UserNotFoundResponse
    }
)
async def get_user(state: State, user_id: UserIDParameter) -> User:
    return await User.fetch_by_id(state.postgresql, user_id)