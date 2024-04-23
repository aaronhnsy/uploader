from litestar import get


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
)
async def get_users_files() -> None:
    pass


@get(
    path="/{file_id:str}",
    summary="Get File",
    tags=["Files"],
)
async def get_users_file() -> None:
    pass


@get(
    path="/",
    summary="Get Multiple Files",
    tags=["Current User Files"],
)
async def get_current_users_files() -> None:
    pass


@get(
    path="/{file_id:str}",
    summary="Get File",
    tags=["Current User Files"],
)
async def get_current_users_file() -> None:
    pass
