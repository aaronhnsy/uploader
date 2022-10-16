from pydantic import BaseModel


__all__ = (
    "File",
)


class File(BaseModel):
    id: str
