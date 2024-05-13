from litestar import get
from litestar.openapi import ResponseSpec
from litestar.status_codes import HTTP_404_NOT_FOUND

from src.exceptions import ReasonException
from src.objects import File
from src.routes.common import FilenameParameter, FileNotFoundResponse, InvalidRequestResponse
from src.routes.common import MissingOrInvalidAuthorizationResponse
from src.types import Request, State


__all__ = [
    "get_current_users_files",
    "get_current_users_file"
]


@get(
    path="/users/me/files",
    summary="Get Current User's Files",
    responses={
        200: ResponseSpec(
            data_container=list[File], generate_examples=False,
            description="Response contains a list of the current user's files."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
    }
)
async def get_current_users_files(state: State, request: Request) -> list[File]:
    return await File.get_all(state.postgresql, user_id=request.user.id)


@get(
    path="/users/me/files/{filename:str}",
    summary="Get Current User's File",
    responses={
        200: ResponseSpec(
            data_container=File, generate_examples=False,
            description="Response contains the current user's file with the given ID."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: FileNotFoundResponse
    }
)
async def get_current_users_file(state: State, request: Request, filename: FilenameParameter) -> File:
    file = await File.get(state.postgresql, user_id=request.user.id, name=filename)
    if file is None:
        raise ReasonException(
            HTTP_404_NOT_FOUND,
            reason="The specified file was not found."
        )
    return file
