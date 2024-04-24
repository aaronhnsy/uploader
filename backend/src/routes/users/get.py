from litestar import get
from litestar.openapi import ResponseSpec

from src.objects import User
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse, UserIDParameter
from src.routes.common import UserNotFoundResponse
from src.types import Request, State


__all__ = [
    "get_user",
    "get_current_user"
]


@get(
    path="/{user_id:str}",
    summary="Get User",
    tags=["Users"],
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


@get(
    path="/me",
    summary="Get Current User",
    tags=["Current User"],
    responses={
        200: ResponseSpec(
            data_container=User, generate_examples=False,
            description="Response contains the current user."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse
    }
)
async def get_current_user(request: Request) -> User:
    return request.user
