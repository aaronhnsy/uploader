from litestar import delete
from litestar.openapi import ResponseSpec

from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse


__all__ = ["delete_current_user"]


@delete(
    path="/users/me",
    summary="Delete User (/me)",
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
    raise NotImplementedError
