from __future__ import annotations

import datetime
import pathlib
from typing import Annotated

import asyncpg
import pydantic
from litestar.status_codes import HTTP_409_CONFLICT

from src.config import CONFIG
from src.enums import Environment
from src.exceptions import ReasonException
from src.types import PostgreSQL
from src.utilities import generate_id


__all__ = ["Upload"]

URL_BASE = "https://uploader.hnsy.dev/" if CONFIG.general.environment == Environment.PRODUCTION else "http://localhost/"


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

    @pydantic.computed_field
    def url(self) -> str:
        return f"{URL_BASE}{self.user_id}/{self.filename}"

    @classmethod
    async def get(
        cls,
        database: PostgreSQL,
        /, *,
        user_id: str,
        upload_id: str
    ) -> Upload | None:
        data: asyncpg.Record | None = await database.fetchrow(
            "SELECT user_id, id, filename, created_at, public, tags FROM uploads "
            "WHERE user_id = $1 and filename = $2",
            user_id, upload_id
        )
        return Upload.model_validate({**data}) if data else None

    @classmethod
    async def get_all(
        cls,
        database: PostgreSQL,
        /, *,
        user_id: str,
        limit: int,
        offset: int
    ) -> list[Upload]:
        data: list[asyncpg.Record] = await database.fetch(
            "SELECT user_id, id, filename, created_at, public, tags FROM uploads "
            "WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
            user_id, limit, offset
        )
        path = pathlib.Path(f"../uploads/{user_id}")
        path.mkdir(parents=True, exist_ok=True)
        files = [x.name for x in path.iterdir()]
        return [Upload.model_validate({**row}) for row in data if row["filename"] in files]

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
        try:
            data: asyncpg.Record = await database.fetchrow(  # pyright: ignore
                "INSERT INTO uploads (user_id, id, filename, created_at, public, tags) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                user_id, generate_id(), filename, datetime.datetime.now(datetime.UTC), public, tags
            )
        except asyncpg.UniqueViolationError:
            raise ReasonException(
                HTTP_409_CONFLICT,
                reason="An upload with that name already exists."
            )
        return Upload.model_validate({**data})
