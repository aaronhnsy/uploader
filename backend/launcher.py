import aiohttp.web

from uploader import utilities, contexts, middlewares, routes
from uploader.config import CONFIG


utilities.logging.setup()

uploader = aiohttp.web.Application()

uploader.router.add_view("/upload", routes.UploadView)
uploader.middlewares.extend([middlewares.exception_handler_middleware, middlewares.authentication_middleware])
uploader.cleanup_ctx.append(contexts.postgresql)

aiohttp.web.run_app(
    uploader,
    host=CONFIG.application.host,
    port=CONFIG.application.port
)
