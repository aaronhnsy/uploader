from litestar import post
from litestar.openapi import ResponseSpec

from src.objects import Upload
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse


__all__ = ["create_uploads_for_current_user"]


@post(
    path="/users/me/uploads",
    summary="Create Uploads (/me)",
    responses={
        201: ResponseSpec(
            data_container=list[Upload], generate_examples=False,
            description="Response contains the created uploads."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
    }
)
async def create_uploads_for_current_user() -> None:
    pass
