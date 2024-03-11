from litestar import delete
from litestar.openapi import ResponseSpec
from litestar.status_codes import HTTP_404_NOT_FOUND

from src.api.common import InvalidRequestResponse, MissingOrInvalidAuthorizationResponse
from src.exceptions import CustomException
from src.models import File
from src.types import Request, State

from .common import FilenameParameter, FileNotFoundResponse, UserIdParameter


__all__ = ["delete_file"]


@delete(
    path="/{user_id:str}/{filename:str}",
    summary="Delete File",
    responses={
        204: ResponseSpec(
            data_container=None, generate_examples=False,
            description="The file was deleted.",
        ),
        400: InvalidRequestResponse,
        401: MissingOrInvalidAuthorizationResponse,
        404: FileNotFoundResponse,
    }
)
async def delete_file(
    request: Request,
    state: State,
    user_id: UserIdParameter,
    filename: FilenameParameter
) -> None:
    file = await File.get(
        state.database,
        user_id=user_id, name=filename
    )
    if (file is None) or (file.user_id != request.user.id):
        raise CustomException(
            HTTP_404_NOT_FOUND,
            reason="The specified file does not exist."
        )
    await file.delete(state.database)
