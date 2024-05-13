from litestar import patch
from litestar.openapi import ResponseSpec

from src.objects import File
from src.routes.common import FilenameParameter, FileNotFoundResponse, InvalidRequestResponse
from src.routes.common import MissingOrInvalidAuthorizationResponse


__all__ = ["edit_current_users_file"]


@patch(
    path="/users/me/files/{filename:str}",
    summary="Edit Current User's File",
    responses={
        200: ResponseSpec(
            data_container=File, generate_examples=False,
            description="The current user's file was updated successfully.",
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: FileNotFoundResponse
    }
)
async def edit_current_users_file(filename: FilenameParameter) -> File:
    pass
