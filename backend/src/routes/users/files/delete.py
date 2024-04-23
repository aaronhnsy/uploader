from litestar import delete


__all__ = [
    "delete_users_file",
    "delete_current_users_file",
]


@delete(
    path="/{file_id:str}",
    summary="Delete File",
    tags=["Files"]
)
async def delete_users_file() -> None:
    pass


@delete(
    path="/{file_id:str}",
    summary="Delete File",
    tags=["Current User Files"]
)
async def delete_current_users_file() -> None:
    pass
