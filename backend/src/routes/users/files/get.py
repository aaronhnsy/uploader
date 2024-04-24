from litestar import get
from litestar.openapi import ResponseSpec

from src.objects import File
from src.routes.common import FileNotFoundResponse, InvalidRequestResponse, MissingOrInvalidAuthorizationResponse
from src.routes.common import UserIDParameter, UserNotFoundResponse


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
            description="Response contains a list of files."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: UserNotFoundResponse
    }
)
async def get_users_files(user_id: UserIDParameter) -> None:
    pass


@get(
    path="/{file_id:str}",
    summary="Get File",
    tags=["Files"],
)
async def get_users_file(user_id: UserIDParameter) -> None:
    pass


@get(
    path="/",
    summary="Get Multiple Files",
    tags=["Current User Files"],
    responses={
        200: ResponseSpec(
            data_container=list[File], generate_examples=False,
            description="Response contains a list of files."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
    }
)
async def get_current_users_files() -> None:
    pass


@get(
    path="/{file_id:str}",
    summary="Get File",
    tags=["Current User Files"],
    responses={
        200: ResponseSpec(
            data_container=list[File], generate_examples=False,
            description="Response contains a list of files."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: FileNotFoundResponse
    }
)
async def get_current_users_file() -> None:
    pass
