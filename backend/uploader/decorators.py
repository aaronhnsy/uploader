import dataclasses
import functools
import typing
from collections.abc import Callable
from typing import Literal

import aiohttp.web
import dacite
import orjson

from uploader.exceptions import JSONException
from uploader.objects import User
from uploader.types import Dataclass, Handler, Request, Response
from uploader.utilities import DACITE_CONFIG, plural, pretty_join, truncate


__all__ = [
    "authenticate_user",
    "check_content_type",
    "load_json_data",
    "ensure_data_matches",
]


def authenticate_user(handler: Handler) -> Handler:
    @functools.wraps(handler)
    async def wrapper(request: Request) -> Response:
        # make sure the 'Authorization' header is present
        if (token := request.headers.get("Authorization")) is None:
            raise JSONException(
                aiohttp.web.HTTPUnauthorized,
                detail="The 'Authorization' header must contain a valid token."
            )
        # get the user from the token and store it in the request object
        request["user"] = await User.get_from_token(
            request.app["pool"],
            token
        )
        # call the handler
        return await handler(request)
    return wrapper


def check_content_type(content_type: str, /) -> Callable[[Handler], Handler]:
    def decorator(handler: Handler) -> Handler:
        @functools.wraps(handler)
        async def wrapper(request: Request) -> Response:
            if content_type != request.content_type:
                raise JSONException(
                    aiohttp.web.HTTPBadRequest,
                    detail=f"Incorrect 'Content-Type' header received, expected '{content_type}' but got "
                           f"'{request.content_type}'."
                )
            return await handler(request)
        return wrapper
    return decorator


def load_json_data(handler: Handler) -> Handler:
    @functools.wraps(handler)
    async def wrapper(request: Request) -> Response:
        # make sure the request body is not empty
        if request.can_read_body is False:
            raise JSONException(
                aiohttp.web.HTTPBadRequest,
                detail="The request body must not be empty."
            )
        # load the body as json and store it in the request object
        try:
            data = orjson.loads(await request.text())
        except orjson.JSONDecodeError:
            raise JSONException(
                aiohttp.web.HTTPBadRequest,
                detail="The request body is not valid JSON."
            )
        request["data"] = data
        # call the handler
        return await handler(request)
    return wrapper


def ensure_data_matches(dataclass: type[Dataclass], /) -> Callable[[Handler], Handler]:
    def decorator(handler: Handler) -> Handler:
        @functools.wraps(handler)
        async def wrapper(request: Request) -> Response:
            try:
                data = dacite.from_dict(dataclass, request["data"], config=DACITE_CONFIG)
            except dacite.MissingValueError:
                missing = [*filter(
                    lambda key: key.default is dataclasses.MISSING and key.name not in request["data"].keys(),
                    dataclasses.fields(dataclass)
                )]
                raise JSONException(
                    aiohttp.web.HTTPBadRequest,
                    detail=f"The request body is missing the following {plural("key", len(missing))}: "
                           f"{pretty_join([key.name for key in missing])}."
                )
            except dacite.WrongTypeError as error:
                if typing.get_origin(error.field_type) == Literal:
                    raise JSONException(
                        aiohttp.web.HTTPBadRequest,
                        detail=f"The value '{truncate(error.value, 25)}' is not a valid string for its "
                               f"field. Valid strings are {pretty_join(typing.get_args(error.field_type))}."
                    )
                raise error
            except dacite.DaciteError as error:
                raise JSONException(
                    aiohttp.web.HTTPBadRequest,
                    detail=f"{error}"
                )
            request["data"] = dataclasses.asdict(data)
            return await handler(request)
        return wrapper
    return decorator
