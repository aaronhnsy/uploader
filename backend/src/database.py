import contextlib
import logging
from typing import AsyncGenerator

import asyncpg
from litestar import Litestar

from src.config import CONFIG
from src.types import Database


__all__ = ["db_connection"]
__log__ = logging.getLogger("uploader.database")


@contextlib.asynccontextmanager
async def db_connection(app: Litestar) -> AsyncGenerator[None, None]:
    # runs when the app is started
    try:
        __log__.debug("Attempting postgresql connection.")
        database: Database = await asyncpg.create_pool(  # pyright: ignore
            CONFIG.storage.postgres_dsn,
            max_inactive_connection_lifetime=0,
            min_size=1, max_size=5,
        )
    except Exception as error:
        __log__.critical("Error while connecting to postgresql.")
        raise error
    else:
        __log__.info("Successfully connected to postgresql.")
        app.state.database = database
    # runs when the app is closed
    try:
        yield
    finally:
        __log__.info("Closing postgresql connection.")
        await app.state.database.close()
