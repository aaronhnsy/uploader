import logging
from collections.abc import AsyncIterator

import aiohttp.web
import asyncpg

from uploader.config import CONFIG


__all__ = (
    "postgresql",
)


LOGGER: logging.Logger = logging.getLogger("uploader.contexts")


async def postgresql(app: aiohttp.web.Application) -> AsyncIterator[None]:

    try:
        LOGGER.debug("Attempting connection to postgresql.")
        pool: asyncpg.Pool = await asyncpg.create_pool(
            CONFIG.connections.postgres_dsn,
            max_inactive_connection_lifetime=0,
            max_size=5, min_size=1,
        )  # type: ignore
    except Exception as error:
        LOGGER.critical("Error while connecting to postgresql.")
        raise error

    LOGGER.info("Successfully connected to postgresql.")
    app["pool"] = pool

    yield

    LOGGER.info("Closing postgresql connection.")
    await pool.close()
