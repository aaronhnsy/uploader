from litestar import Litestar
from litestar.openapi import OpenAPIConfig
from litestar.openapi.spec import Components, SecurityScheme

from src.config import CONFIG
from src.database import db_connection
from src.enums import Environment
from src.exceptions import exception_handler
from src.middleware import AuthenticationMiddleware
from src.routes import routers


__all__ = ["uploader"]


uploader = Litestar(
    route_handlers=routers,
    lifespan=[db_connection],  # type: ignore
    middleware=[AuthenticationMiddleware],
    exception_handlers={Exception: exception_handler},
    openapi_config=OpenAPIConfig(
        title="Uploader",
        version="1.0.0",
        components=Components(
            security_schemes={
                "token": SecurityScheme(
                    type="apiKey",
                    name="Authorization",
                    security_scheme_in="header",
                )
            },
        ),
    ),
    debug=True if CONFIG.general.environment == Environment.DEVELOPMENT else False,
)
