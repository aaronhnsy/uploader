import dataclasses
from typing import Self

import asyncpg
import dacite

from uploader.types import Pool
from uploader.utilities import DACITE_CONFIG


__all__ = ["File"]


@dataclasses.dataclass
class File:
    user_id: str
    name: str
    format: str
    hidden: bool

    @classmethod
    async def create(
        cls,
        pool: Pool,
        /, *,
        user_id: str,
        name: str,
        format: str,
        hidden: bool,
    ) -> Self:
        file: asyncpg.Record = await pool.fetchrow(  # pyright: ignore
            "INSERT INTO files (user_id, name, format, hidden) VALUES ($1, $2, $3, $4) RETURNING *",
            user_id, name, format, hidden
        )
        return dacite.from_dict(cls, {**file}, config=DACITE_CONFIG)
