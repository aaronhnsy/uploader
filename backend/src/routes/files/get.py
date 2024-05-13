from litestar import get
from litestar.openapi import ResponseSpec

from src.objects import File
from src.routes.common import FilenameParameter, FileNotFoundResponse, InvalidRequestResponse
from src.routes.common import MissingOrInvalidAuthorizationResponse, UserIDParameter, UserNotFoundResponse
from src.routes.common import UserOrFileNotFoundResponse


__all__ = [
    "get_users_files",
    "get_users_file",
    "get_current_users_files",
    "get_current_users_file",
]


@get(
    path="/",
    summary="Get Multiple Files",
    tags=["Files"],
    responses={
        200: ResponseSpec(
            data_container=list[File], generate_examples=False,
            description="Response contains a list of the users files."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: UserNotFoundResponse
    }
)
async def get_users_files(user_id: UserIDParameter) -> None:
    pass


@get(
    path="/{filename:str}",
    summary="Get File",
    tags=["Files"],
    responses={
        200: ResponseSpec(
            data_container=File, generate_examples=False,
            description="Response contains the user's file with the given ID."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: UserOrFileNotFoundResponse
    }
)
async def get_users_file(user_id: UserIDParameter, filename: FilenameParameter) -> None:
    pass


@get(
    path="/",
    summary="Get Current User's Files",
    tags=["Current User Files"],
    responses={
        200: ResponseSpec(
            data_container=list[File], generate_examples=False,
            description="Response contains a list of the current user's files."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
    }
)
async def get_current_users_files() -> None:
    pass


@get(
    path="/{filename:str}",
    summary="Get Current User's File",
    tags=["Current User Files"],
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
async def get_current_users_file(filename: FilenameParameter) -> None:
    pass
