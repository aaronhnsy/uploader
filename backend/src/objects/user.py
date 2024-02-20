from __future__ import annotations

from typing import Annotated

import asyncpg
from pydantic import BaseModel, Field

from src.enums import Permissions
from src.types import Database


__all__ = ["User"]


class User(BaseModel):
    id: Annotated[str, Field(min_length=16, max_length=16)]
    name: Annotated[str, Field(max_length=32)]
    bot: bool
    permissions: Permissions

    @classmethod
    async def fetch_by_id(cls, database: Database, id: int) -> User | None:
        user: asyncpg.Record | None = await database.fetchrow(
            "SELECT id, name, bot, permissions "
            "FROM users "
            "WHERE id = $1",
            id
        )
        return User.model_validate({**user}) if user else None