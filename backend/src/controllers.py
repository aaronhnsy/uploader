from starlite import Controller, get, patch, delete

from src.models import PagedResponse, File


class FileController(Controller):
    path = "/files"

    @get()
    async def get_files(self) -> PagedResponse[File]:
        raise ValueError
        return PagedResponse(
            total=2,
            limit=50,
            offset=0,
            items=[
                File(id="test 1"),
                File(id="test 2"),
            ]
        )

    @get("/{file_id:str}")
    async def get_file(self) -> None:
        ...

    @patch("/{file_id:str}")
    async def edit_file(self) -> None:
        ...

    @delete("/{file_id:str}")
    async def delete_file(self) -> None:
        ...
