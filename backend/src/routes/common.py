from typing import Annotated

from litestar.openapi import ResponseSpec
from litestar.params import Body

from src.exceptions import Error
from src.objects import Upload, User


__all__ = [
    "UserIDParameter", "UploadIDParameter",
    "InvalidRequestResponse", "MissingOrInvalidAuthorizationResponse", "MissingPermissionsResponse",
    "UserOrUploadNotFoundResponse", "UserNotFoundResponse", "UploadNotFoundResponse",
    "UserUpdatedResponse", "UploadUpdatedResponse",
    "UserDeletedResponse", "UploadDeletedResponse"
]


UserIDParameter = Annotated[
    str,
    Body(
        min_length=16, max_length=16,
        description="A 16-character user id."
    )
]
UploadIDParameter = Annotated[
    str,
    Body(
        min_length=16, max_length=16,
        description="A 16-character upload id."
    )
]

# Error responses (400, 401, 403)
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
    description="The authenticated user does not have permission to perform this action."
)

# Not Found responses (404)
UserOrUploadNotFoundResponse: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="The specified user or upload was not found."
)
UserNotFoundResponse: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="The specified user was not found."
)
UploadNotFoundResponse: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="The specified upload was not found."
)

# Update responses (200)
UserUpdatedResponse: ResponseSpec = ResponseSpec(
    data_container=User, generate_examples=False,
    description="Response contains the updated user."
)
UploadUpdatedResponse: ResponseSpec = ResponseSpec(
    data_container=Upload, generate_examples=False,
    description="Response contains the updated upload."
)

# Deletion responses (204)
UserDeletedResponse: ResponseSpec = ResponseSpec(
    data_container=None, generate_examples=False,
    description="The user was deleted successfully."
)
UploadDeletedResponse: ResponseSpec = ResponseSpec(
    data_container=None, generate_examples=False,
    description="The upload was deleted successfully."
)
