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
        pydantic.Field(
            description="The user's id.",
            min_length=16, max_length=16
        )
    ]
    username: Annotated[
        str,
        pydantic.Field(
            description="The user's name.",
            min_length=1, max_length=32
        )
    ]
    bot: Annotated[
        bool,
        pydantic.Field(description="Whether the user is a bot or not.")
    ]
    permissions: Annotated[
        Permissions,
        pydantic.Field(
            description="The user's permissions.",
            strict=False
        )
    ]
    profile_picture: Annotated[
        str,
        pydantic.Field(description="The user's profile picture.")
    ]
    upload_count: Annotated[
        int,
        pydantic.Field(description="The number of uploads the user has.")
    ]

    @classmethod
    async def fetch_by_id(cls, database: PostgreSQL, _id: str, /) -> User:
        data: asyncpg.Record | None = await database.fetchrow(
            "SELECT id, username, bot, permissions, profile_picture, "
            "(SELECT count(*) FROM uploads WHERE uploads.user_id = $1) as upload_count "
            "FROM users WHERE users.id = $1",
            _id
        )
        if data is None:
            raise ReasonException(
                HTTP_401_UNAUTHORIZED,
                reason="A user with the specified id does not exist."
            )
        return User.model_validate({**data})

    @classmethod
    async def validate_username_and_password(
        cls,
        database: PostgreSQL,
        /, *,
        username: str,
        password: str
    ) -> User:
        data: asyncpg.Record | None = await database.fetchrow(
            "SELECT id, username, password, bot, permissions, profile_picture FROM users WHERE username = $1",
            username
        )
        if data is None:
            raise ReasonException(
                HTTP_401_UNAUTHORIZED,
                reason="A user with the specified username does not exist."
            )
        if verify_password(password, data["password"]) is False:
            raise ReasonException(
                HTTP_401_UNAUTHORIZED,
                reason="The username and password do not match."
            )
        return User.model_validate({**data})
