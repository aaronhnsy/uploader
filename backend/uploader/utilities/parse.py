import re


__all__ = (
    "parse_filesize",
)


UNITS: dict[str, int] = {
    "b":  1,
    "kb": 2 ** 10,
    "mb": 2 ** 20,
    "gb": 2 ** 30,
    "tb": 2 ** 40,
}
FILESIZE_REGEX: re.Pattern[str] = re.compile(
    r"(?P<size>[0-9.]+)\s?(?P<unit>[kmgt]?b)",
    re.IGNORECASE
)


def parse_filesize(size: str) -> int:

    if not (match := FILESIZE_REGEX.fullmatch(size)):
        raise ValueError(f"Could not parse '{size}' into bytes.")

    return int(float(match["size"]) * UNITS[match["unit"]])
