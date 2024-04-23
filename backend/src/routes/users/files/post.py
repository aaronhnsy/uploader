from litestar import post


__all__ = ["upload_files"]


@post(
    path="/",
    summary="Upload Files",
    tags=["Current User Files"]
)
async def upload_files() -> None:
    pass
