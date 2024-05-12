from litestar import post
from litestar.openapi import ResponseSpec

from src.objects import File
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse


__all__ = ["create_current_user_token"]


@post(
    path="/",
    summary="Create Token",
    tags=["Current User Tokens"],
    responses={
        200: ResponseSpec(
            data_container=list[File], generate_examples=False,
            description="Response contains the uploaded files."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
    }
)
async def create_current_user_token() -> None:
    pass
