from litestar.openapi import OpenAPIConfig
from litestar.openapi.plugins import ScalarRenderPlugin, StoplightRenderPlugin, SwaggerRenderPlugin
from litestar.openapi.spec import Components, SecurityScheme, Tag


__all__ = ["openapi_config"]


openapi_config: OpenAPIConfig = \
    OpenAPIConfig(
        title="Uploader",
        version="1.0.0",
        path="/api/schema",
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
        render_plugins=[ScalarRenderPlugin(), SwaggerRenderPlugin(), StoplightRenderPlugin()]
    )
