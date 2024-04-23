from litestar import Litestar

from src.config import CONFIG
from src.enums import Environment
from src.exceptions import exception_handlers
from src.middleware import AuthenticationMiddleware
from src.openapi import openapi_config
from src.routes import router
from src.storage import postgresql_lifespan, store_registry


__all__ = ["uploader"]


uploader = Litestar(
    route_handlers=[router],
    lifespan=[postgresql_lifespan],  # type: ignore
    middleware=[AuthenticationMiddleware],
    stores=store_registry,
    exception_handlers=exception_handlers,
    openapi_config=openapi_config,
    debug=CONFIG.general.environment == Environment.DEVELOPMENT,
)
