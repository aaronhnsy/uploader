from litestar import patch

from src.objects import Upload
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse, MissingPermissionsResponse
from src.routes.common import UploadIDParameter, UploadUpdatedResponse, UserIDParameter, UserOrUploadNotFoundResponse


__all__ = ["update_upload"]


@patch(
    path="/users/{user_id:str}/uploads/{upload_id:str}",
    summary="Update Upload",
    responses={
        200: UploadUpdatedResponse,
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        403: MissingPermissionsResponse,
        404: UserOrUploadNotFoundResponse
    }
)
async def update_upload(user_id: UserIDParameter, upload_id: UploadIDParameter) -> Upload:
    raise NotImplementedError
