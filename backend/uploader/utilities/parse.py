import datetime
import re

import aiohttp.web
import dacite

from uploader import exceptions, utilities
from uploader.enums import Environment, Permissions
from uploader.types import Colour, FileSize


__all__ = [
    "parse_time",
    "parse_colour",
    "parse_file_size",
    "DACITE_CONFIG",
]


def parse_time(time: str) -> datetime.time:
    try:
        return datetime.time.fromisoformat(time)
    except ValueError:
        raise exceptions.JSONException(
            aiohttp.web.HTTPBadRequest,
            detail=f"The value '{utilities.truncate(time, 25)}' is not a valid time. It must be in the format of "
                   f"'HH:MM:SS'."
        )


_COLOUR_REGEX: re.Pattern[str] = re.compile(
    r"^#[0-9a-f]{6}$",
    re.IGNORECASE
)


def parse_colour(colour: str) -> Colour:
    if _COLOUR_REGEX.fullmatch(colour) is None:
        raise exceptions.JSONException(
            aiohttp.web.HTTPBadRequest,
            detail=f"The value '{utilities.truncate(colour, 25)}' is not a valid colour. It must be in the format of "
                   f"'#RRGGBB'."
        )
    return Colour(colour)


_UNITS_TO_BYTES: dict[str, int] = {
    "b":  1,
    "kb": 2 ** 10,
    "mb": 2 ** 20,
    "gb": 2 ** 30,
    "tb": 2 ** 40,
}
_FILE_SIZE_REGEX: re.Pattern[str] = re.compile(
    r"^(?P<size>[0-9.]+)\s?(?P<unit>[kmgt]?b)$",
    re.IGNORECASE
)


def parse_file_size(size: str) -> FileSize:
    if (match := _FILE_SIZE_REGEX.fullmatch(size)) is None:
        raise ValueError(
            f"The value '{utilities.truncate(size, 25)}' is not a valid file size. It must be in the format of "
            f"'<number><unit>'."
        )
    return FileSize(int(float(match["size"]) * _UNITS_TO_BYTES[match["unit"]]))


DACITE_CONFIG = dacite.Config(
    type_hooks={
        Environment:   Environment.__getitem__,
        Permissions:   Permissions,
        datetime.time: parse_time,
        Colour:        parse_colour,
        FileSize:      parse_file_size,
    }
)
