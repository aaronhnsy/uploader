import logging
from collections.abc import AsyncIterator

import aiohttp.web
import asyncpg

from uploader.config import CONFIG
from uploader.types import Pool


__all__ = ["postgresql_context"]
__log__ = logging.getLogger("uploader.contexts")


async def postgresql_context(app: aiohttp.web.Application) -> AsyncIterator[None]:
    # runs when the app is started
    try:
        __log__.debug("Attempting postgresql connection.")
        pool: Pool = await asyncpg.create_pool(  # pyright: ignore
            CONFIG.storage.postgres_dsn,
            max_inactive_connection_lifetime=0,
            min_size=1, max_size=5,
        )
    except Exception as error:
        __log__.critical("Error while connecting to postgresql.")
        raise error
    else:
        __log__.info("Successfully connected to postgresql.")
        app["pool"] = pool
    # runs when the app is closed
    try:
        yield
    finally:
        __log__.info("Closing postgresql connection.")
        await pool.close()
