from litestar import delete

from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse, MissingPermissionsResponse
from src.routes.common import UploadDeletedResponse, UploadIDParameter, UserIDParameter, UserOrUploadNotFoundResponse


__all__ = ["delete_upload"]


@delete(
    path="/users/{user_id:str}/uploads/{upload_id:str}",
    summary="Delete Upload",
    responses={
        204: UploadDeletedResponse,
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        403: MissingPermissionsResponse,
        404: UserOrUploadNotFoundResponse
    }
)
async def delete_upload(user_id: UserIDParameter, upload_id: UploadIDParameter) -> None:
    raise NotImplementedError
