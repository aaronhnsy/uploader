import uuid
from collections.abc import Sequence


__all__ = [
    "pretty_join",
    "plural",
    "truncate",
    "generate_id",
]


def pretty_join(elements: Sequence[str]) -> str:
    """Joins a list of elements into a string, adding commas and an 'and' where appropriate."""
    if len(elements) == 1:
        return f"'{elements[0]}'"
    return ", ".join([f"'{element}'" for element in elements[:-1]]) + f" and '{elements[-1]}'"


def plural(word: str, count: int) -> str:
    """Adds an 's' to the end of a word if the count is more than one."""
    return f"{word}{'s' if count > 1 else ''}"


def truncate(string: str, length: int) -> str:
    """Truncates a string to a given length, adding an ellipsis if it was truncated."""
    return f"{string[:length]}..." if len(string) > length else string


def generate_id() -> str:
    """Generates a random sixteen character ID."""
    return uuid.uuid4().hex[:16].lower()
