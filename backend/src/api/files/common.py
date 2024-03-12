from typing import Annotated

from litestar.openapi import ResponseSpec
from litestar.params import Parameter

from src.exceptions import Error


__all__ = [
    "UserIdParameter",
    "FilenameParameter",
    "FileNotFoundResponseSpec",
]

UserIdParameter = Annotated[
    str,
    Parameter(
        min_length=16, max_length=16,
        description="The file owner's user id.",
    )
]
FilenameParameter = Annotated[
    str,
    Parameter(
        min_length=1, max_length=255,
        description="The name of the file, including the file extension.",
    )
]

FileNotFoundResponseSpec: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="The file was not found.",
)
