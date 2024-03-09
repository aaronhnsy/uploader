from __future__ import annotations

from typing import Annotated

import asyncpg
import pydantic

from src.enums import Permissions
from src.types import Database


__all__ = ["User"]


class User(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True, use_enum_values=True)
    id: Annotated[
        str,
        pydantic.Field(
            min_length=16, max_length=16,
            description="The user's id."
        )
    ]
    name: Annotated[
        str,
        pydantic.Field(
            min_length=1, max_length=32,
            description="The user's name."
        )
    ]
    bot: Annotated[
        bool,
        pydantic.Field(description="Whether the user is a bot or not.")
    ]
    permissions: Annotated[
        Permissions,
        pydantic.Field(description="The user's permissions.")
    ]

    @pydantic.field_validator("permissions", mode="before")
    @classmethod
    def _validate_permissions(cls, value: int) -> Permissions:
        try:
            return Permissions(value)
        except KeyError:
            raise ValueError(f"Invalid permissions: '{value}'")

    @classmethod
    async def fetch_by_name_and_password(
        cls, database: Database, /,
        *,
        name: str,
        password: str,
    ) -> User | None:
        user: asyncpg.Record | None = await database.fetchrow(
            "SELECT id, name, bot, permissions "
            "FROM users "
            "WHERE name = $1 AND password = crypt($2, password)",
            name, password
        )
        return User.model_validate({**user}) if user else None

    @classmethod
    async def fetch_by_id(cls, database: Database, id: int) -> User | None:
        user: asyncpg.Record | None = await database.fetchrow(
            "SELECT id, name, bot, permissions "
            "FROM users "
            "WHERE id = $1",
            id
        )
        return User.model_validate({**user}) if user else None
