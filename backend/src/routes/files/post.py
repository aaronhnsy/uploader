from litestar import post
from litestar.openapi import ResponseSpec

from src.objects import File
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse


__all__ = ["upload_files"]


@post(
    path="/",
    summary="Upload Files",
    tags=["Current User Files"],
    responses={
        201: ResponseSpec(
            data_container=list[File], generate_examples=False,
            description="Response contains the uploaded files."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
    }
)
async def upload_files() -> None:
    pass
