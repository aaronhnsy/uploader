from litestar import get
from litestar.openapi import ResponseSpec
from litestar.status_codes import HTTP_404_NOT_FOUND

from src.api.common import InvalidRequestResponseSpec, MissingOrInvalidAuthorizationResponseSpec
from src.exceptions import ReasonException
from src.models import File
from src.types import Request, State

from .common import FilenameParameter, FileNotFoundResponseSpec, UserIdParameter


__all__ = ["get_file"]


@get(
    path="/{user_id:str}/{filename:str}",
    summary="Get File",
    responses={
        200: ResponseSpec(
            data_container=File, generate_examples=False,
            description="The file was found.",
        ),
        400: InvalidRequestResponseSpec,
        401: MissingOrInvalidAuthorizationResponseSpec,
        404: FileNotFoundResponseSpec,
    }
)
async def get_file(
    request: Request,
    state: State,
    user_id: UserIdParameter,
    filename: FilenameParameter
) -> File:
    file = await File.get(
        state.postgresql,
        user_id=user_id, name=filename
    )
    if (file is None) or (file.private is True and file.user_id != request.user.id):
        raise ReasonException(
            HTTP_404_NOT_FOUND,
            reason="The specified file does not exist."
        )
    return file
