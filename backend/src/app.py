from litestar import Litestar

from src.database import db_connection
from src.exceptions import exception_handler
from src.middlewares import AuthenticationMiddleware
from src.routes import routers


__all__ = ["uploader"]


uploader = Litestar(
    route_handlers=routers,
    lifespan=[db_connection],  # type: ignore
    middleware=[AuthenticationMiddleware],
    exception_handlers={Exception: exception_handler},
    debug=True,
)
