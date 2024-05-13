from litestar import get
from litestar.openapi import ResponseSpec

from src.objects import User
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse
from src.types import Request


__all__ = ["get_current_user"]


@get(
    path="/users/me",
    summary="Get Current User",
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
