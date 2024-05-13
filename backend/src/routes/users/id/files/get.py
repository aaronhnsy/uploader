from litestar import get
from litestar.openapi import ResponseSpec
from litestar.status_codes import HTTP_404_NOT_FOUND

from src.exceptions import ReasonException
from src.objects import File
from src.routes.common import FilenameParameter, InvalidRequestResponse, MissingOrInvalidAuthorizationResponse
from src.routes.common import UserIDParameter, UserOrFileNotFoundResponse
from src.types import State


__all__ = [
    "get_users_file",
    "get_users_files"
]


@get(
    path="/users/{user_id:str}/files",
    summary="Get Multiple Files",
    responses={
        200: ResponseSpec(
            data_container=list[File], generate_examples=False,
            description="Response contains a list of the users files."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
    }
)
async def get_users_files(state: State, user_id: UserIDParameter) -> list[File]:
    return await File.get_all(state.postgresql, user_id=user_id)


@get(
    path="/users/{user_id:str}/files/{filename:str}",
    summary="Get File",
    responses={
        200: ResponseSpec(
            data_container=File, generate_examples=False,
            description="Response contains the given user's file with the given ID."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: UserOrFileNotFoundResponse
    }
)
async def get_users_file(state: State, user_id: UserIDParameter, filename: FilenameParameter) -> File:
    file = await File.get(state.postgresql, user_id=user_id, name=filename)
    if file is None:
        raise ReasonException(
            HTTP_404_NOT_FOUND,
            reason="The specified user or file was not found."
        )
    return file
