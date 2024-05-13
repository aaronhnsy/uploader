from litestar import patch
from litestar.openapi import ResponseSpec

from src.objects import File
from src.routes.common import FilenameParameter, FileNotFoundResponse, InvalidRequestResponse
from src.routes.common import MissingOrInvalidAuthorizationResponse, MissingPermissionsResponse, UserIDParameter
from src.routes.common import UserOrFileNotFoundResponse


__all__ = [
    "edit_users_file",
    "edit_current_users_file",
]


@patch(
    path="/{filename:str}",
    summary="Edit File",
    tags=["Files"],
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


@patch(
    path="/{filename:str}",
    summary="Edit Current User's File",
    tags=["Current User Files"],
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
