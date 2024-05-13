from litestar import patch
from litestar.openapi import ResponseSpec

from src.objects import File
from src.routes.common import FilenameParameter, InvalidRequestResponse, MissingOrInvalidAuthorizationResponse
from src.routes.common import MissingPermissionsResponse, UserIDParameter, UserOrFileNotFoundResponse


__all__ = ["edit_users_file"]


@patch(
    path="/users/{user_id:str}/files/{filename:str}",
    summary="Edit File",
    responses={
        200: ResponseSpec(
            data_container=File, generate_examples=False,
            description="The user's file was updated successfully.",
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        403: MissingPermissionsResponse,
        404: UserOrFileNotFoundResponse
    }
)
async def edit_users_file(user_id: UserIDParameter, filename: FilenameParameter) -> File:
    pass
