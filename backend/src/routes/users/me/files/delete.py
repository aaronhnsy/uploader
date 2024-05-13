from litestar import delete
from litestar.openapi import ResponseSpec

from src.routes.common import FilenameParameter, FileNotFoundResponse, InvalidRequestResponse
from src.routes.common import MissingOrInvalidAuthorizationResponse


__all__ = ["delete_current_users_file"]


@delete(
    path="/users/me/files/{filename:str}",
    summary="Delete Current User's File",
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
