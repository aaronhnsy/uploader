from typing import Annotated

from litestar.openapi import ResponseSpec
from litestar.params import Body

from src.exceptions import Error


__all__ = [
    "UserIDParameter",
    "FilenameParameter",
    "InvalidRequestResponse",
    "MissingOrInvalidAuthorizationResponse",
    "MissingPermissionsResponse",
    "UserNotFoundResponse",
    "FileNotFoundResponse",
    "UserOrFileNotFoundResponse"
]

UserIDParameter = Annotated[
    str,
    Body(
        min_length=16, max_length=16,
        description="The user's 16 character ID."
    )
]
FilenameParameter = Annotated[
    str,
    Body(
        min_length=1, max_length=255,
        description="The name of the file."
    )
]

InvalidRequestResponse: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="Your request is invalid. Check the response `reason` for more information."
)
MissingOrInvalidAuthorizationResponse: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="This endpoint requires authentication. Provide a valid token in the `Authorization` header."
)
MissingPermissionsResponse: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="You do not have permission to perform this action."
)
UserNotFoundResponse: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="The specified user was not found."
)
FileNotFoundResponse: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="The specified file was not found."
)
UserOrFileNotFoundResponse: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="The specified user or file was not found."
)
