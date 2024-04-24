from typing import Annotated

from litestar.openapi import ResponseSpec
from litestar.params import Body

from src.exceptions import Error


__all__ = [
    "UserIDParameter",
    "InvalidRequestResponse",
    "MissingOrInvalidAuthorizationResponse",
    "MissingPermissionsResponse",
    "UserNotFoundResponse",
    "FileNotFoundResponse"
]

UserIDParameter = Annotated[
    str,
    Body(
        min_length=16, max_length=16,
        description="An existing 16 character user ID."
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
    description="A user with the given ID was not found."
)
FileNotFoundResponse: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="A file with the given ID was not found."
)
