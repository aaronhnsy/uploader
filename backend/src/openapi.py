from litestar.openapi import OpenAPIConfig, OpenAPIController
from litestar.openapi.spec import Components, SecurityScheme, Tag


__all__ = ["openapi_config"]


class CustomOpenAPIController(OpenAPIController):
    stoplight_elements_js_url = "https://unpkg.com/@stoplight/elements/web-components.min.js"
    stoplight_elements_css_url = "https://unpkg.com/@stoplight/elements/styles.min.css"


openapi_config: OpenAPIConfig = \
    OpenAPIConfig(
        title="Uploader",
        version="1.0.0",
        openapi_controller=CustomOpenAPIController,
        tags=[
            Tag(name="Users", description="Operations related to users."),
            Tag(name="Files", description="Operations related to files."),
            Tag(name="Current User", description="Operations related to the current user."),
            Tag(name="Current User Files", description="Operations related to the current user's files."),
        ],
        components=Components(
            security_schemes={
                "token": SecurityScheme(
                    type="apiKey",
                    name="Authorization",
                    security_scheme_in="header",
                )
            }
        ),
        root_schema_site="elements",
    )
