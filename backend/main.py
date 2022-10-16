import uvicorn
from starlite import Starlite, Router

from src.controllers import FilesController, MeController, UsersController
from src.exceptions import exception_handler
from src.middlewares import AuthenticationMiddleware
from src.utilities import get_asyncpg_pool, close_asyncpg_pool


API = Router(
    "/api",
    route_handlers=[FilesController, UsersController, MeController],
    middleware=[AuthenticationMiddleware],
)

app = Starlite(
    route_handlers=[API],
    exception_handlers={Exception: exception_handler},
    on_startup=[get_asyncpg_pool],
    on_shutdown=[close_asyncpg_pool]
)

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
