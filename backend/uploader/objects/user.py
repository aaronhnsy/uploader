import dataclasses
from typing import Self

import aiohttp.web
import asyncpg
import dacite

from uploader.enums import Permissions
from uploader.exceptions import JSONException
from uploader.types import Pool
from uploader.utilities import DACITE_CONFIG


__all__ = ["User"]


@dataclasses.dataclass
class User:
    id: str
    email: str
    token: str
    name: str
    bot: bool
    permissions: Permissions

    @classmethod
    async def get_from_token(cls, pool: Pool, token: str) -> Self:
        user: asyncpg.Record | None = await pool.fetchrow(
            "SELECT id, email, token, name, bot, permissions "
            "FROM users "
            "WHERE token = $1",
            token
        )
        if user is None:
            raise JSONException(
                aiohttp.web.HTTPUnauthorized,
                detail="The provided token is either invalid or did not match any users."
            )
        return dacite.from_dict(cls, {**user}, config=DACITE_CONFIG)

    @classmethod
    async def get_from_email_and_password(cls, pool: Pool, email: str, password: str) -> Self:
        user: asyncpg.Record | None = await pool.fetchrow(
            "SELECT id, email, token, name, bot, permissions "
            "FROM users "
            "WHERE email = $1 "
            "AND password = crypt($2, password)",
            email, password
        )
        if user is None:
            raise JSONException(
                aiohttp.web.HTTPNotFound,
                detail="The provided email and password combination did not match any users."
            )
        return dacite.from_dict(cls, {**user}, config=DACITE_CONFIG)
