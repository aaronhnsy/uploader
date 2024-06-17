from litestar import get
from litestar.openapi import ResponseSpec
from litestar.status_codes import HTTP_404_NOT_FOUND

from src.exceptions import ReasonException
from src.models import Upload
from src.routes.common import InvalidRequestResponse, LimitParameter, MissingOrInvalidAuthorizationResponse, OffsetParameter
from src.routes.common import UploadIDParameter, UserIDParameter, UserOrUploadNotFoundResponse
from src.types import State


__all__ = [
    "get_uploads",
    "get_upload"
]


@get(
    path="/users/{user_id:str}/uploads",
    summary="Get Uploads",
    responses={
        200: ResponseSpec(
            data_container=list[Upload], generate_examples=False,
            description="Response contains a list of the specified user's uploads."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
    }
)
async def get_uploads(
    state: State,
    user_id: UserIDParameter,
    limit: LimitParameter = 5,
    offset: OffsetParameter = 0,
) -> list[Upload]:
    return await Upload.get_all(
        state.postgresql, user_id=user_id,
        limit=limit, offset=offset
    )


@get(
    path="/users/{user_id:str}/uploads/{upload_id:str}",
    summary="Get Upload",
    responses={
        200: ResponseSpec(
            data_container=Upload, generate_examples=False,
            description="Response contains the requested upload from the user with the specified id."
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: UserOrUploadNotFoundResponse
    }
)
async def get_upload(
    state: State,
    user_id: UserIDParameter, upload_id: UploadIDParameter
) -> Upload:
    upload = await Upload.get(state.postgresql, user_id=user_id, upload_id=upload_id)
    if upload is None:
        raise ReasonException(
            HTTP_404_NOT_FOUND,
            reason="The specified user or upload was not found."
        )
    # TODO: Check if file is public before allowing anyone (other than the owner) to request it.
    return upload
