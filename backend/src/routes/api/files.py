import os
import pathlib
from typing import Annotated

import pydantic
from litestar import Controller, get, post
from litestar.datastructures import UploadFile
from litestar.enums import RequestEncodingType
from litestar.params import Body
from litestar.status_codes import HTTP_404_NOT_FOUND

from src.config import CONFIG
from src.enums import Environment
from src.exceptions import CustomException
from src.objects import File
from src.types import Request, State
from src.utilities import generate_id


__all__ = ["FilesController"]


MEDIA = pathlib.Path(
    f"{os.environ["HOME"]}/media/"
    if CONFIG.general.environment == Environment.PRODUCTION
    else "media/"
)


class UploadFileData(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(
        title="lol",
        arbitrary_types_allowed=True,
        extra="forbid",
    )
    file: Annotated[
        UploadFile,
        Body(description="The file to upload.")
    ]
    use_original_filename: Annotated[
        bool,
        Body(
            description="Whether the file should keep its original filename or not.",
            default=False
        )
    ] = False
    private: Annotated[
        bool,
        Body(
            description="Whether the file should be private or not.",
            default=True
        )
    ] = True


class FilesController(Controller):
    path = "/files"
    security = [{"token": []}]

    @post("/")
    async def upload_file(
        self,
        request: Request, state: State,
        data: Annotated[UploadFileData, Body(media_type=RequestEncodingType.MULTI_PART)]
    ) -> File:
        # use the original filename or generate a new one
        if data.use_original_filename is True:
            filename = data.file.filename
        else:
            filename = f"{generate_id()}{pathlib.Path(data.file.filename).suffix}"
        # create a record in the database
        file = await File.create(
            state.database,
            user_id=request.user.id,
            name=filename,
            private=data.private
        )
        # save the file to disk
        path = MEDIA / f"{request.user.id}" / f"{filename}"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(await data.file.read())
        # return the file information
        return file

    @get("/{user_id:str}/{filename:str}")
    async def get_file(
        self,
        request: Request, state: State,
        user_id: str, filename: str
    ) -> File:
        file = await File.get(
            state.database,
            user_id=user_id,
            name=filename
        )
        if (file is None) or (file.private is True and file.user_id != request.user.id):
            raise CustomException(
                HTTP_404_NOT_FOUND,
                reason="The file you are looking for does not exist."
            )
        return file
