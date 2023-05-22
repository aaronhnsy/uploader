import dataclasses
import functools
import typing
from collections.abc import Callable
from typing import Literal

import aiohttp.web
import dacite
import orjson

from uploader import exceptions, utilities
from uploader.types import Dataclass, Handler, Request, Response


__all__ = [
    "check_content_type",
    "load_json_data",
    "ensure_data_matches",
]


def check_content_type(content_type: str, /) -> Callable[[Handler], Handler]:
    def decorator(function: Handler) -> Handler:
        @functools.wraps(function)
        async def wrapper(request: Request) -> Response:
            if content_type != request.content_type:
                raise exceptions.JSONException(
                    aiohttp.web.HTTPBadRequest,
                    detail=f"Incorrect 'Content-Type' header received, expected '{content_type}' but got "
                           f"'{request.content_type}'."
                )
            return await function(request)
        return wrapper
    return decorator


def load_json_data(function: Handler) -> Handler:
    @functools.wraps(function)
    async def wrapper(request: Request) -> Response:
        # make sure the body is not empty/unreadable
        if request.can_read_body is False:
            raise exceptions.JSONException(
                aiohttp.web.HTTPBadRequest,
                detail="The request body must not be empty."
            )
        # make sure the body is valid json
        try:
            data = orjson.loads(await request.text())
        except orjson.JSONDecodeError:
            raise exceptions.JSONException(
                aiohttp.web.HTTPBadRequest,
                detail="The request body is not valid JSON."
            )
        # store the data in the request object
        request["data"] = data
        # call the function
        return await function(request)
    return wrapper


def ensure_data_matches(dataclass: type[Dataclass], /) -> Callable[[Handler], Handler]:
    def decorator(function: Handler) -> Handler:
        @functools.wraps(function)
        async def wrapper(request: Request) -> Response:
            try:
                data = dacite.from_dict(
                    dataclass, request["data"],
                    config=utilities.DACITE_CONFIG
                )
            except dacite.MissingValueError:
                missing = [*filter(
                    lambda key: key.default is dataclasses.MISSING and key.name not in request["data"].keys(),
                    dataclasses.fields(dataclass)
                )]
                raise exceptions.JSONException(
                    aiohttp.web.HTTPBadRequest,
                    detail=f"The request body is missing the following {utilities.plural('key', len(missing))}: "
                           f"{utilities.pretty_join([key.name for key in missing])}."
                )
            except dacite.WrongTypeError as error:
                if typing.get_origin(error.field_type) == Literal:  # type: ignore
                    raise exceptions.JSONException(
                        aiohttp.web.HTTPBadRequest,
                        detail=f"The value '{utilities.truncate(error.value, 25)}' is not a valid string for its "
                               f"field. Valid strings are {utilities.pretty_join(typing.get_args(error.field_type))}."
                    )
                raise error
            except dacite.DaciteError as error:
                raise exceptions.JSONException(
                    aiohttp.web.HTTPBadRequest,
                    detail=f"{error}"
                )
            request["data"] = dataclasses.asdict(data)
            return await function(request)
        return wrapper
    return decorator
