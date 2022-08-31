import asyncpg
from starlite import Starlite, Router, State

from src.controllers import FileController
from src.exceptions import exception_handler
# from src.middlewares import AuthenticationMiddleware
from src.settings import settings


API = Router(
    "/api",
    route_handlers=[FileController],
    # middleware=[AuthenticationMiddleware],
)


async def get_asyncpg_pool(state: State) -> asyncpg.Pool:

    pool: asyncpg.Pool | None = getattr(state, "pool", None)

    if not pool:
        try:
            pool = await asyncpg.create_pool(
                settings.POSTGRES_DSN,
                max_inactive_connection_lifetime=0,
                max_size=5,
                min_size=0,
            )
        except Exception as e:
            raise ConnectionError() from e
        else:
            assert pool is not None
            state.pool = pool

    return pool


app = Starlite(
    route_handlers=[API],
    exception_handlers={Exception: exception_handler},
    on_startup=[get_asyncpg_pool]
)
