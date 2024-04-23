from __future__ import annotations

from typing import Annotated

import asyncpg
import pydantic
from litestar.status_codes import HTTP_401_UNAUTHORIZED

from src.enums import Permissions
from src.exceptions import ReasonException
from src.security import verify_password
from src.types import PostgreSQL


__all__ = ["User"]


class User(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True, extra="ignore")

    id: Annotated[
        str,
        pydantic.Field(description="The user's id.", min_length=16, max_length=16)
    ]
    name: Annotated[
        str,
        pydantic.Field(description="The user's name.", min_length=1, max_length=32)
    ]
    bot: Annotated[
        bool,
        pydantic.Field(description="Whether the user is a bot or not.")
    ]
    permissions: Annotated[
        Permissions,
        pydantic.Field(description="The user's permissions.", strict=False)
    ]
    profile_picture: Annotated[
        str,
        pydantic.Field(description="The user's profile picture.")
    ]

    @classmethod
    async def fetch_by_username_and_password(
        cls, database: PostgreSQL,
        /, *,
        name: str,
        password: str
    ) -> User:
        data: asyncpg.Record | None = await database.fetchrow(
            "SELECT id, name, password, bot, permissions, profile_picture FROM users WHERE name = $1",
            name
        )
        if data is None:
            raise ReasonException(
                HTTP_401_UNAUTHORIZED,
                reason="User not found."
            )
        if verify_password(password, data["password"]) is False:
            raise ReasonException(
                HTTP_401_UNAUTHORIZED,
                reason="Password is incorrect."
            )
        return User.model_validate({**data})

    @classmethod
    async def fetch_by_id(cls, database: PostgreSQL, _id: str, /) -> User:
        data: asyncpg.Record | None = await database.fetchrow(
            "SELECT id, name, bot, permissions, profile_picture FROM users WHERE id = $1",
            _id
        )
        if data is None:
            raise ReasonException(
                HTTP_401_UNAUTHORIZED,
                reason="User not found."
            )
        return User.model_validate({**data})
