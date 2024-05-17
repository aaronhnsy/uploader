from litestar import patch
from litestar.openapi import ResponseSpec

from src.models import User
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse, MissingPermissionsResponse
from src.routes.common import UserIDParameter, UserNotFoundResponse


__all__ = ["edit_user"]


@patch(
    path="/users/{user_id:str}",
    summary="Edit User",
    responses={
        200: ResponseSpec(
            data_container=User, generate_examples=False,
            description="Response contains the updated user."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        403: MissingPermissionsResponse,
        404: UserNotFoundResponse
    }
)
async def edit_user(user_id: UserIDParameter) -> User:
    raise NotImplementedError
