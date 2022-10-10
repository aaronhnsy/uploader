import asyncpg
import uvicorn
from starlite import Starlite, Router, State

from src import controllers, middlewares, exceptions
from src.config import CONFIG


API = Router(
    "/api",
    route_handlers=[controllers.FilesController, controllers.UsersController],
    middleware=[middlewares.AuthenticationMiddleware],
)


async def get_asyncpg_pool(state: State) -> asyncpg.Pool:

    pool: asyncpg.Pool | None = getattr(state, "pool", None)

    if pool is None:
        try:
            pool = await asyncpg.create_pool(
                CONFIG.connections.postgres_dsn,
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
    exception_handlers={Exception: exceptions.exception_handler},
    on_startup=[get_asyncpg_pool],
    on_shutdown=[close_asyncpg_pool]
)

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
