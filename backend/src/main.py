from starlite import Starlite, Router

from src.controllers import FileController
from src.exceptions import exception_formatter
from src.middlewares import AuthenticationMiddleware


API_router = Router(
    "/api",
    route_handlers=[FileController],
    middleware=[AuthenticationMiddleware],
)

app = Starlite(
    route_handlers=[API_router],
    exception_handlers={Exception: exception_formatter}
)
