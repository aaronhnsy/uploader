from litestar import delete
from litestar.openapi import ResponseSpec

from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse, MissingPermissionsResponse
from src.routes.common import UserIDParameter, UserNotFoundResponse


__all__ = [
    "delete_user",
    "delete_current_user"
]


@delete(
    path="/{user_id:str}",
    summary="Delete User",
    tags=["Users"],
    responses={
        204: ResponseSpec(
            data_container=None, generate_examples=False,
            description="The user was deleted successfully.",
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        403: MissingPermissionsResponse,
        404: UserNotFoundResponse
    }
)
async def delete_user(user_id: UserIDParameter) -> None:
    pass


@delete(
    path="/me",
    summary="Delete Current User",
    tags=["Current User"],
    responses={
        204: ResponseSpec(
            data_container=None, generate_examples=False,
            description="The current user was deleted successfully.",
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
    }
)
async def delete_current_user() -> None:
    pass
