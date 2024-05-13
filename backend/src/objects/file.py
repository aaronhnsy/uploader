from __future__ import annotations

import datetime
from typing import Annotated

import asyncpg
import pydantic

from src.types import PostgreSQL


__all__ = ["File"]


class File(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True, extra="ignore")
    user_id: Annotated[
        str,
        pydantic.Field(
            description="The owner's user id.",
            min_length=16, max_length=16
        )
    ]
    name: Annotated[
        str,
        pydantic.Field(
            description="The name of the file, including the file extension.",
            min_length=1, max_length=255,
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
        cls, database: PostgreSQL,
        /, *,
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
        cls, database: PostgreSQL,
        /, *,
        user_id: str,
        name: str,
    ) -> File | None:
        file: asyncpg.Record | None = await database.fetchrow(
            "SELECT * from files WHERE user_id = $1 AND name = $2",
            user_id, name
        )
        return File.model_validate({**file}) if file else None

    @classmethod
    async def get_all(
        cls, database: PostgreSQL,
        /, *,
        user_id: str,
    ) -> list[File]:
        files: list[asyncpg.Record] = await database.fetch(
            "SELECT * from files WHERE user_id = $1",
            user_id
        )
        return [File.model_validate({**file}) for file in files]
