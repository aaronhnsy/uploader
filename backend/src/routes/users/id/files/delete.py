from litestar import delete
from litestar.openapi import ResponseSpec

from src.routes.common import FilenameParameter, InvalidRequestResponse, MissingOrInvalidAuthorizationResponse
from src.routes.common import MissingPermissionsResponse, UserIDParameter, UserOrFileNotFoundResponse


__all__ = ["delete_users_file"]


@delete(
    path="/users/{user_id:str}/files/{filename:str}",
    summary="Delete File",
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
