from pydantic import BaseModel


__all__ = (
    "File",
)


class File(BaseModel):
    id: int
    user_id: int
    name: str
    format: str
    private: bool
