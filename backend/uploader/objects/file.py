import dataclasses
from typing import Self

import asyncpg
import dacite

from uploader import utilities
from uploader.types import Pool


__all__ = ["File"]


@dataclasses.dataclass
class File:
    user_id: str
    name: str
    format: str
    private: bool

    @classmethod
    async def create(
        cls,
        pool: Pool,
        user_id: str,
        name: str,
        format: str,
        private: bool,
    ) -> Self:
        file: asyncpg.Record = await pool.fetchrow(  # pyright: ignore
            "INSERT INTO files (user_id, name, format, private) VALUES ($1, $2, $3, $4) RETURNING *",
            user_id, name, format, private
        )
        return dacite.from_dict(cls, {**file}, config=utilities.DACITE_CONFIG)
