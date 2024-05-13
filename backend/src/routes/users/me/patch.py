from litestar import patch
from litestar.openapi import ResponseSpec

from src.objects import User
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse


__all__ = ["edit_current_user"]


@patch(
    path="/users/me",
    summary="Edit Current User",
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
