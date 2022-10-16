import asyncpg
import snowflake
from starlite import State

from src.config import CONFIG


__all__ = (
    "generate_snowflake",
    "get_asyncpg_pool",
    "close_asyncpg_pool"
)


_snowflake_generator = snowflake.SnowflakeGenerator(0)


def generate_snowflake() -> int:

    if not (x := next(_snowflake_generator)):
        raise RuntimeError("could not generate new snowflake")

    return x


async def get_asyncpg_pool(state: State) -> asyncpg.Pool:

    pool: asyncpg.Pool | None = getattr(state, "pool", None)

    if pool is None:
        try:
            pool = await asyncpg.create_pool(
                CONFIG.connections.postgres_dsn,
                max_inactive_connection_lifetime=0,
                max_size=5, min_size=0,
            )
        except Exception as e:
            raise ConnectionError() from e

        assert pool is not None
        state.pool = pool

    return pool


async def close_asyncpg_pool(state: State) -> None:

    pool: asyncpg.Pool | None = getattr(state, "pool", None)
    if pool is None:
        return

    await pool.close()
    del state.pool
