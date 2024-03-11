from litestar.openapi import ResponseSpec

from src.exceptions import Error


__all__ = [
    "InvalidRequestResponseSpec",
    "MissingOrInvalidAuthorizationResponseSpec",
]


InvalidRequestResponseSpec: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="Your request is invalid. Check the response `reason` for more information."
)
MissingOrInvalidAuthorizationResponseSpec: ResponseSpec = ResponseSpec(
    data_container=Error, generate_examples=False,
    description="This endpoint requires authentication. Provide a valid `Authorization` header."
)
