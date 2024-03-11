from litestar import get
from litestar.openapi import ResponseSpec

from src.api.common import InvalidRequestResponseSpec, MissingOrInvalidAuthorizationResponseSpec
from src.models import User
from src.types import Request


__all__ = ["get_current_user"]


@get(
    path="/@me",
    summary="Get Current User",
    responses={
        200: ResponseSpec(
            data_container=User, generate_examples=False,
            description="Response contains the currently authenticated user."
        ),
        400: InvalidRequestResponseSpec,
        401: MissingOrInvalidAuthorizationResponseSpec
    },
)
async def get_current_user(request: Request) -> User:
    return request.user
