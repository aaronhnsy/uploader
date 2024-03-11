from typing import Annotated

from litestar.openapi import ResponseSpec
from litestar.params import Parameter

from src.exceptions import ExceptionData


__all__ = [
    "UserIdParameter",
    "FilenameParameter",
    "FileNotFoundResponse",
]

type UserIdParameter = Annotated[
    str,
    Parameter(
        min_length=16, max_length=16,
        description="The file owner's user id.",
    )
]
type FilenameParameter = Annotated[
    str,
    Parameter(
        min_length=1, max_length=255,
        description="The name of the file, including the file extension.",
    )
]

FileNotFoundResponse: ResponseSpec = ResponseSpec(
    data_container=ExceptionData, generate_examples=False,
    description="The file was not found.",
)
