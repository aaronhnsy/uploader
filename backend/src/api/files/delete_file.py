from litestar import delete
from litestar.openapi import ResponseSpec
from litestar.status_codes import HTTP_404_NOT_FOUND

from src.api.common import InvalidRequestResponseSpec, MissingOrInvalidAuthorizationResponseSpec
from src.exceptions import ReasonException
from src.models import File
from src.types import Request, State

from .common import FilenameParameter, FileNotFoundResponseSpec, UserIdParameter


__all__ = ["delete_file"]


@delete(
    path="/{user_id:str}/{filename:str}",
    summary="Delete File",
    responses={
        204: ResponseSpec(
            data_container=None, generate_examples=False,
            description="The file was deleted.",
        ),
        400: InvalidRequestResponseSpec,
        401: MissingOrInvalidAuthorizationResponseSpec,
        404: FileNotFoundResponseSpec,
    }
)
async def delete_file(
    request: Request,
    state: State,
    user_id: UserIdParameter,
    filename: FilenameParameter
) -> None:
    file = await File.get(
        state.postgresql,
        user_id=user_id, name=filename
    )
    if (file is None) or (file.user_id != request.user.id):
        raise ReasonException(
            HTTP_404_NOT_FOUND,
            reason="The specified file does not exist."
        )
    await file.delete(state.postgresql)
