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
    name: str
    bot: bool
    permissions: Permissions

    @classmethod
    async def get(cls, pool: Pool, token: str) -> Self:
        user: asyncpg.Record | None = await pool.fetchrow(
            "SELECT id, email, name, bot, permissions FROM users WHERE token = $1",
            token
        )
        if user is None:
            raise JSONException(
                aiohttp.web.HTTPUnauthorized,
                detail="The provided token is either invalid or did not match any users."
            )
        return dacite.from_dict(cls, {**user}, config=DACITE_CONFIG)
