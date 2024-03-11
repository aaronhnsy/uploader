from __future__ import annotations

import datetime
from typing import Annotated

import asyncpg
import pydantic

from src.types import Database


__all__ = ["File"]


class File(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True)

    user_id: Annotated[
        str,
        pydantic.Field(
            min_length=16, max_length=16,
            description="The owner's user id.",
        )
    ]
    name: Annotated[
        str,
        pydantic.Field(
            min_length=1, max_length=255,
            description="The name of the file, including the file extension.",
        )
    ]
    created_at: Annotated[
        datetime.datetime,
        pydantic.Field(description="The date and time the file was created.")
    ]
    private: Annotated[
        bool,
        pydantic.Field(description="Whether the file is private or public.")
    ]

    @classmethod
    async def create(
        cls, database: Database, /,
        *,
        user_id: str,
        name: str,
        private: bool,
    ) -> File:
        file: asyncpg.Record = await database.fetchrow(  # pyright: ignore
            "INSERT INTO files (user_id, name, private) VALUES ($1, $2, $3) RETURNING *",
            user_id, name, private
        )
        return File.model_validate({**file})

    @classmethod
    async def get(
        cls, database: Database, /,
        *,
        user_id: str,
        name: str,
    ) -> File | None:
        file: asyncpg.Record | None = await database.fetchrow(
            "SELECT * from files WHERE user_id = $1 AND name = $2",
            user_id, name
        )
        return File.model_validate({**file}) if file else None

    async def delete(self, database: Database, /) -> None:
        await database.execute(
            "DELETE FROM files WHERE user_id = $1 AND name = $2",
            self.user_id, self.name
        )
