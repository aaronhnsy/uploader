from __future__ import annotations

import datetime
from typing import Annotated

import asyncpg
import pydantic

from src.types import PostgreSQL
from src.utilities import generate_id


__all__ = ["Upload"]


class Upload(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(strict=True, extra="ignore")
    user_id: Annotated[
        str,
        pydantic.Field(
            description="The id of the user who created this upload.",
            min_length=16, max_length=16
        )
    ]
    id: Annotated[
        str,
        pydantic.Field(
            description="The unique id of this upload.",
            min_length=16, max_length=16
        )
    ]
    filename: Annotated[
        str,
        pydantic.Field(
            description="The name of the file that was uploaded, including the file extension.",
            min_length=1, max_length=255,
        )
    ]
    created_at: Annotated[
        datetime.datetime,
        pydantic.Field(description="The date and time that the upload was created.")
    ]
    public: Annotated[
        bool,
        pydantic.Field(description="Whether this upload is public or not.")
    ]
    tags: Annotated[
        list[str],
        pydantic.Field(description="The tags associated with this upload.")
    ]

    @classmethod
    async def get(
        cls,
        database: PostgreSQL,
        /, *,
        user_id: str,
        upload_id: str
    ) -> Upload | None:
        data: asyncpg.Record | None = await database.fetchrow(
            "SELECT user_id, id, filename, created_at, public, tags FROM uploads WHERE user_id = $1 and filename = $2",
            user_id, upload_id
        )
        return Upload.model_validate({**data}) if data else None

    @classmethod
    async def get_all(
        cls,
        database: PostgreSQL,
        /, *,
        user_id: str
    ) -> list[Upload]:
        data: list[asyncpg.Record] = await database.fetch(
            "SELECT user_id, id, filename, created_at, public, tags FROM uploads WHERE user_id = $1",
            user_id
        )
        return [Upload.model_validate({**row}) for row in data]

    @classmethod
    async def create(
        cls,
        database: PostgreSQL,
        /, *,
        user_id: str,
        filename: str,
        public: bool,
        tags: list[str]
    ) -> Upload:
        data: asyncpg.Record = await database.fetchrow(  # pyright: ignore
            "INSERT INTO uploads (user_id, id, filename, created_at, public, tags) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            user_id, generate_id(), filename, datetime.datetime.now(datetime.UTC), public, tags
        )
        return Upload.model_validate({**data})
