from litestar import get
from litestar.openapi import ResponseSpec
from litestar.status_codes import HTTP_404_NOT_FOUND

from src.exceptions import ReasonException
from src.models import Upload
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse, UploadIDParameter
from src.routes.common import UploadNotFoundResponse
from src.types import Request, State


__all__ = [
    "get_uploads_for_current_user",
    "get_upload_for_current_user"
]


@get(
    path="/users/me/uploads",
    summary="Get Uploads (/me)",
    responses={
        200: ResponseSpec(
            data_container=list[Upload], generate_examples=False,
            description="Response contains a list of the current user's uploads."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
    }
)
async def get_uploads_for_current_user(
    request: Request, state: State
) -> list[Upload]:
    return await Upload.get_all(state.postgresql, user_id=request.user.id)


@get(
    path="/users/me/uploads/{upload_id:str}",
    summary="Get Upload (/me)",
    responses={
        200: ResponseSpec(
            data_container=Upload, generate_examples=False,
            description="Response contains the requested upload from the current user."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: UploadNotFoundResponse
    }
)
async def get_upload_for_current_user(
    request: Request, state: State,
    upload_id: UploadIDParameter
) -> Upload:
    upload = await Upload.get(state.postgresql, user_id=request.user.id, upload_id=upload_id)
    if upload is None:
        raise ReasonException(
            HTTP_404_NOT_FOUND,
            reason="The specified upload was not found."
        )
    return upload
