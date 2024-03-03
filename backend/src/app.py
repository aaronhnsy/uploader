from litestar import Litestar
from litestar.exceptions import HTTPException
from litestar.openapi import OpenAPIConfig
from litestar.openapi.spec import Components, SecurityScheme

from src.config import CONFIG
from src.database import db_connection
from src.enums import Environment
from src.exceptions import CustomException, handle_custom_exception, handle_http_exception, handle_other_exception
from src.middleware import AuthenticationMiddleware
from src.routes import routers


__all__ = ["uploader"]


uploader = Litestar(
    route_handlers=routers,
    lifespan=[db_connection],  # type: ignore
    middleware=[AuthenticationMiddleware],
    exception_handlers={
        CustomException: handle_custom_exception,
        HTTPException: handle_http_exception,
        Exception: handle_other_exception,
    },
    openapi_config=OpenAPIConfig(
        title="Uploader",
        version="1.0.0",
        root_schema_site="elements",
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
