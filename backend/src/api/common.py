from litestar.openapi import ResponseSpec

from src.exceptions import ExceptionData


__all__ = [
    "InvalidRequestResponse",
    "NotAuthenticatedResponse",
]


InvalidRequestResponse = ResponseSpec(
    data_container=ExceptionData, generate_examples=False,
    description="Your request was invalid.",
)
NotAuthenticatedResponse = ResponseSpec(
    data_container=ExceptionData, generate_examples=False,
    description="You are not authenticated.",
)
