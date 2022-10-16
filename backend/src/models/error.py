from pydantic import BaseModel


__all__ = (
    "Error",
)


class Error(BaseModel):
    status: int
    reason: str
    detail: str | None
