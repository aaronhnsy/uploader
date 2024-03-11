import os
import pathlib
from typing import Annotated

import asyncpg
import pydantic
from litestar import post
from litestar.datastructures import UploadFile
from litestar.enums import RequestEncodingType
from litestar.openapi import ResponseSpec
from litestar.params import Body
from litestar.status_codes import HTTP_409_CONFLICT

from src.api.common import InvalidRequestResponseSpec, MissingOrInvalidAuthorizationResponseSpec
from src.config import CONFIG
from src.enums import Environment
from src.exceptions import Error, ReasonException
from src.models import File
from src.types import Request, State
from src.utilities import generate_id


__all__ = ["upload_file"]


MEDIA_DIRECTORY = pathlib.Path(
    f"{os.environ["HOME"]}/media/"
    if CONFIG.general.environment == Environment.PRODUCTION
    else "media/"
)


class UploadFileRequest(pydantic.BaseModel):
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


@post(
    path="/",
    summary="Upload File",
    responses={
        201: ResponseSpec(
            data_container=File, generate_examples=False,
            description="The file was uploaded successfully.",
        ),
        400: InvalidRequestResponseSpec,
        401: MissingOrInvalidAuthorizationResponseSpec,
        409: ResponseSpec(
            data_container=Error, generate_examples=False,
            description="You already have a file with that name.",
        ),
    }
)
async def upload_file(
    request: Request, state: State,
    data: Annotated[
        UploadFileRequest,
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
            state.postgresql,
            user_id=request.user.id,
            name=filename,
            private=data.private
        )
    except asyncpg.UniqueViolationError:
        raise ReasonException(
            HTTP_409_CONFLICT,
            reason="You already have a file with that name."
        )
    # save the file to disk
    path = MEDIA_DIRECTORY / f"{request.user.id}" / f"{filename}"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(await data.file.read())
    # return the file information
    return file
