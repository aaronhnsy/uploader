from litestar.openapi import ResponseSpec

from src.exceptions import ExceptionData


__all__ = [
    "InvalidRequestResponse",
    "MissingOrInvalidAuthorizationResponse",
]


InvalidRequestResponse: ResponseSpec = ResponseSpec(
    data_container=ExceptionData, generate_examples=False,
    description="Your request is invalid. Check the response `reason` for more information."
)
MissingOrInvalidAuthorizationResponse: ResponseSpec = ResponseSpec(
    data_container=ExceptionData, generate_examples=False,
    description="This endpoint requires authentication. Provide a valid `Authorization` header."
)
