from litestar import patch

from src.models import Upload
from src.routes.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse, UploadIDParameter
from src.routes.common import UploadNotFoundResponse, UploadUpdatedResponse


__all__ = ["update_upload_for_current_user"]


@patch(
    path="/users/me/uploads/{upload_id:str}",
    summary="Update Upload (/me)",
    responses={
        200: UploadUpdatedResponse,
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: UploadNotFoundResponse
    }
)
async def update_upload_for_current_user(upload_id: UploadIDParameter) -> Upload:
    raise NotImplementedError
