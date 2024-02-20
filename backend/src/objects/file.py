from __future__ import annotations

from typing import Annotated

import asyncpg
from pydantic import BaseModel, Field

from src.types import Database


__all__ = ["File"]


class File(BaseModel):
    user_id: Annotated[str, Field(min_length=16, max_length=16)]
    name: str
    format: str
    hidden: bool

    @classmethod
    async def create(
        cls,
        database: Database,
        /, *,
        user_id: str,
        name: str,
        format: str,
        hidden: bool,
    ) -> File:
        file: asyncpg.Record = await database.fetchrow(  # pyright: ignore
            "INSERT INTO files (user_id, name, format, hidden) VALUES ($1, $2, $3, $4) RETURNING *",
            user_id, name, format, hidden
        )
        return File.model_validate(file)
