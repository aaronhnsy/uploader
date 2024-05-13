from litestar import delete
from litestar.openapi import ResponseSpec

from src.routes.common import FilenameParameter, FileNotFoundResponse, InvalidRequestResponse
from src.routes.common import MissingOrInvalidAuthorizationResponse, MissingPermissionsResponse, UserIDParameter
from src.routes.common import UserOrFileNotFoundResponse


__all__ = [
    "delete_users_file",
    "delete_current_users_file",
]


@delete(
    path="/{filename:str}",
    summary="Delete File",
    tags=["Files"],
    responses={
        204: ResponseSpec(
            data_container=None, generate_examples=False,
            description="The user's file was deleted successfully.",
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        403: MissingPermissionsResponse,
        404: UserOrFileNotFoundResponse
    }
)
async def delete_users_file(user_id: UserIDParameter, filename: FilenameParameter) -> None:
    pass


@delete(
    path="/{filename:str}",
    summary="Delete Current User's File",
    tags=["Current User Files"],
    responses={
        204: ResponseSpec(
            data_container=None, generate_examples=False,
            description="The current user's file was deleted successfully.",
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: FileNotFoundResponse
    }
)
async def delete_current_users_file(filename: FilenameParameter) -> None:
    pass
