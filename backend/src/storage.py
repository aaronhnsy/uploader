import contextlib
from collections.abc import Callable
from typing import AsyncGenerator

import asyncpg
from litestar import Litestar
from litestar.stores.redis import RedisStore
from litestar.stores.registry import StoreRegistry

from src.config import CONFIG
from src.types import PostgreSQL


__all__ = [
    "postgresql_lifespan",
    "store_registry"
]


@contextlib.asynccontextmanager
async def postgresql_lifespan(app: Litestar) -> AsyncGenerator[None, None]:
    # runs when the app is started
    database: PostgreSQL = await asyncpg.create_pool(  # pyright: ignore
        CONFIG.storage.postgres_dsn,
        max_inactive_connection_lifetime=0,
        min_size=1, max_size=5,
    )
    app.state.postgresql = database
    # runs when the app is stopped
    try:
        yield
    finally:
        await app.state.postgresql.close()


redis_store: RedisStore = \
    RedisStore.with_client(CONFIG.storage.redis_dsn)

store_default_factory: Callable[[str], RedisStore] = \
    lambda name: redis_store.with_namespace(name)

store_registry: StoreRegistry = \
    StoreRegistry(default_factory=store_default_factory)
