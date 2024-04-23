from litestar import patch
from litestar.openapi import ResponseSpec

from src.objects import User
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse, MissingPermissionsResponse
from src.routes.common import UserIDParameter, UserNotFoundResponse


__all__ = [
    "edit_user",
    "edit_current_user"
]


@patch(
    path="/{user_id:str}",
    summary="Edit User",
    tags=["Users"],
    responses={
        200: ResponseSpec(
            data_container=User, generate_examples=False,
            description="The user was updated successfully.",
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        403: MissingPermissionsResponse,
        404: UserNotFoundResponse
    }
)
async def edit_user(user_id: UserIDParameter) -> User:
    pass


@patch(
    path="/me",
    summary="Edit Current User",
    tags=["Current User"],
    responses={
        200: ResponseSpec(
            data_container=User, generate_examples=False,
            description="The current user was updated successfully.",
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
    }
)
async def edit_current_user() -> User:
    pass
