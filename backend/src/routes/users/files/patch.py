from litestar import patch


__all__ = [
    "edit_users_file",
    "edit_current_users_file",
]


@patch(
    path="/{file_id:str}",
    summary="Edit File",
    tags=["Files"]
)
async def edit_users_file() -> None:
    pass


@patch(
    path="/{file_id:str}",
    summary="Edit File",
    tags=["Current User Files"]
)
async def edit_current_users_file() -> None:
    pass
