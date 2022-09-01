import asyncpg
from starlite import Starlite, Router

from src.controllers import FilesController
from src.exceptions import exception_handler
# from src.middlewares import AuthenticationMiddleware
from src.settings import settings
from src.types import State


API = Router(
    "/api",
    route_handlers=[FilesController],
    # middleware=[AuthenticationMiddleware],
)


async def get_asyncpg_pool(state: State) -> asyncpg.Pool:

    pool: asyncpg.Pool | None = getattr(state, "pool", None)

    if pool is None:
        try:
            pool = await asyncpg.create_pool(
                settings.POSTGRES_DSN,
                max_inactive_connection_lifetime=0,
                max_size=5,
                min_size=0,
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


app = Starlite(
    route_handlers=[API],
    exception_handlers={Exception: exception_handler},
    on_startup=[get_asyncpg_pool],
    on_shutdown=[close_asyncpg_pool]
)
