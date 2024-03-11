from litestar.openapi import ResponseSpec

from src.exceptions import ExceptionData


__all__ = [
    "InvalidRequestResponse",
    "UserNotFoundOrPasswordNotMatchedResponse",
    "NotAuthenticatedResponse",
]


InvalidRequestResponse: ResponseSpec = ResponseSpec(
    data_container=ExceptionData, generate_examples=False,
    description="Your request was invalid.",
)
UserNotFoundOrPasswordNotMatchedResponse: ResponseSpec = ResponseSpec(
    data_container=ExceptionData, generate_examples=False,
    description="The user was not found or the password did not match.",
)
NotAuthenticatedResponse: ResponseSpec = ResponseSpec(
    data_container=ExceptionData, generate_examples=False,
    description="You are not authenticated.",
)
