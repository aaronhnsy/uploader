from typing import TypedDict
from typing_extensions import Unpack


__all__ = (
    "FileData",
    "File"
)


class FileData(TypedDict):
    user_id: int
    name: str
    format: str
    private: bool


class File:

    def __init__(self, **data: Unpack[FileData]) -> None:
        self.data = data

        self.user_id: int = data["user_id"]
        self.name: str = data["name"]
        self.format: str = data["format"]
        self.private: bool = data["private"]

    @property
    def info(self) -> FileData:
        return self.data
