import pathlib
from typing import Annotated

import pydantic
from litestar import post
from litestar.datastructures import UploadFile
from litestar.enums import RequestEncodingType
from litestar.openapi import ResponseSpec
from litestar.params import Body

from src.exceptions import Error
from src.models import Upload
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse
from src.types import Request, State
from src.utilities import generate_id


__all__ = ["create_upload_for_current_user"]


class CreateUploadRequest(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(arbitrary_types_allowed=True, strict=True)
    file: Annotated[
        UploadFile,
        Body(description="The file to upload.")
    ]
    use_original_filename: Annotated[
        bool,
        Body(description="Whether the file should be saved with its original filename. Defaults to `False`.")
    ] = False
    public: Annotated[
        bool,
        Body(description="Whether the upload should be public. Defaults to `False`.")
    ] = False
    tags: Annotated[
        list[str],
        Body(description="The tags to associate with this upload. Defaults to an empty list.")
    ] = []


@post(
    path="/users/me/uploads",
    summary="Create Upload (/me)",
    responses={
        201: ResponseSpec(
            data_container=list[Upload], generate_examples=False,
            description="Response contains the created upload."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        409: ResponseSpec(
            data_container=Error, generate_examples=False,
            description="An upload with the specified name already exists."
        )
        # 409 is returned when the user already has a file with the same name.
    }
)
async def create_upload_for_current_user(
    request: Request, state: State,
    data: Annotated[
        CreateUploadRequest,
        Body(
            media_type=RequestEncodingType.MULTI_PART,
            description="Information about the file to upload.",
        )
    ]
) -> Upload:
    # use the provided filename, or generate a new one.
    if data.use_original_filename is True:
        filename = data.file.filename
    else:
        filename = f"{generate_id()}{pathlib.Path(data.file.filename).suffix}"
    # create a new file record in the database
    upload = await Upload.create(
        state.postgresql,
        user_id=request.user.id,
        filename=filename,
        public=data.public,
        tags=data.tags
    )
    # save the file to disk
    path = pathlib.Path("../uploads") / f"{request.user.id}" / f"{filename}"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(await data.file.read())
    # return the upload information
    return upload
