from __future__ import annotations

import datetime
from typing import Annotated

import asyncpg
import pydantic
from litestar.status_codes import HTTP_409_CONFLICT

from src.exceptions import CustomException
from src.types import Database


__all__ = ["File"]


class File(pydantic.BaseModel):
    user_id: Annotated[str, pydantic.Field(min_length=16, max_length=16)]
    name: Annotated[str, pydantic.Field(min_length=1, max_length=255)]
    created_at: datetime.datetime
    private: bool

    @classmethod
    async def create(
        cls,
        database: Database,
        /, *,
        user_id: str,
        name: str,
        private: bool,
    ) -> File:
        try:
            file: asyncpg.Record = await database.fetchrow(  # pyright: ignore
                "INSERT INTO files (user_id, name, private) VALUES ($1, $2, $3) RETURNING *",
                user_id, name, private
            )
        except asyncpg.exceptions.UniqueViolationError:
            raise CustomException(
                HTTP_409_CONFLICT,
                reason="You already have a file with that name."
            )
        return File.model_validate({**file})

    @classmethod
    async def get(
        cls,
        database: Database,
        /, *,
        user_id: str,
        name: str,
    ) -> File | None:
        file: asyncpg.Record | None = await database.fetchrow(
            "SELECT * from files WHERE user_id = $1 AND name = $2",
            user_id, name
        )
        return File.model_validate({**file}) if file else None
