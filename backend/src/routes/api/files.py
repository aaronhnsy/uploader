import os
import pathlib
from typing import Annotated

import asyncpg
import pydantic
from litestar import Controller, get, post
from litestar.datastructures import UploadFile
from litestar.enums import RequestEncodingType
from litestar.openapi import ResponseSpec
from litestar.params import Body, Parameter
from litestar.status_codes import HTTP_404_NOT_FOUND, HTTP_409_CONFLICT

from src.config import CONFIG
from src.enums import Environment
from src.exceptions import CustomException, ExceptionModel
from src.models import File
from src.types import Request, State
from src.utilities import generate_id


__all__ = ["FilesController"]


MEDIA = pathlib.Path(
    f"{os.environ["HOME"]}/media/"
    if CONFIG.general.environment == Environment.PRODUCTION
    else "media/"
)


class UploadFileModel(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(arbitrary_types_allowed=True, strict=True)
    file: Annotated[
        UploadFile,
        Body(description="The file to upload.")
    ]
    use_original_filename: Annotated[
        bool,
        Body(description="Whether the file should be saved with its original filename. Defaults to `False`.")
    ] = False
    private: Annotated[
        bool,
        Body(description="Whether the file should be private. Defaults to `True`.")
    ] = True


class FilesController(Controller):
    path = "/files"
    security = [{"token": []}]

    @post(
        "/",
        responses={
            201: ResponseSpec(
                data_container=File,
                description="The file was uploaded successfully.",
                generate_examples=False,
            ),
            400: ResponseSpec(
                data_container=ExceptionModel,
                description="Your request was invalid.",
                generate_examples=False
            ),
            401: ResponseSpec(
                data_container=ExceptionModel,
                description="You are not authenticated.",
                generate_examples=False
            ),
            409: ResponseSpec(
                data_container=ExceptionModel,
                description="You already have a file with that name.",
                generate_examples=False
            ),
        }
    )
    async def upload_file(
        self,
        request: Request, state: State,
        data: Annotated[
            UploadFileModel,
            Body(
                media_type=RequestEncodingType.MULTI_PART,
                description="Information about the file to upload.",
            )
        ]
    ) -> File:
        # use the provided filename, or generate a new one.
        if data.use_original_filename is True:
            filename = data.file.filename
        else:
            filename = f"{generate_id()}{pathlib.Path(data.file.filename).suffix}"
        # create a new file record in the database
        try:
            file = await File.create(
                state.database,
                user_id=request.user.id,
                name=filename,
                private=data.private
            )
        except asyncpg.UniqueViolationError:
            raise CustomException(
                HTTP_409_CONFLICT,
                reason="You already have a file with that name."
            )
        # save the file to disk
        path = MEDIA / f"{request.user.id}" / f"{filename}"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(await data.file.read())
        # return the file information
        return file

    @get(
        "/{user_id:str}/{filename:str}",
        responses={
            200: ResponseSpec(
                data_container=File,
                description="The file was found.",
                generate_examples=False
            ),
            400: ResponseSpec(
                data_container=ExceptionModel,
                description="Your request was invalid.",
                generate_examples=False
            ),
            401: ResponseSpec(
                data_container=ExceptionModel,
                description="You are not authenticated.",
                generate_examples=False
            ),
            404: ResponseSpec(
                data_container=ExceptionModel,
                description="The file was not found.",
                generate_examples=False
            ),
        }
    )
    async def get_file(
        self,
        request: Request, state: State,
        user_id: Annotated[
            str,
            Parameter(
                description="The user ID of the file's owner.",
                min_length=16, max_length=16
            )
        ],
        filename: Annotated[
            str,
            Parameter(
                description="The name of the file. Including the file extension.",
                min_length=1, max_length=255
            )
        ]
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
