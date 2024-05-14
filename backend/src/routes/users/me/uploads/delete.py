from litestar import delete

from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse, UploadDeletedResponse
from src.routes.common import UploadIDParameter, UploadNotFoundResponse


__all__ = ["delete_upload_for_current_user"]


@delete(
    path="/users/me/uploads/{upload_id:str}",
    summary="Delete Upload (/me)",
    responses={
        204: UploadDeletedResponse,
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: UploadNotFoundResponse
    }
)
async def delete_upload_for_current_user(upload_id: UploadIDParameter) -> None:
    raise NotImplementedError
