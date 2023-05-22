import aiohttp.web

from uploader import contexts, middlewares, routes, logger
from uploader.config import CONFIG


logger.setup_logging()

uploader = aiohttp.web.Application()

uploader.middlewares.append(middlewares.exception_middleware)
uploader.middlewares.append(middlewares.authentication_middleware)
uploader.cleanup_ctx.append(contexts.postgresql_context)

uploader.router.add_routes([
    aiohttp.web.post("/api/upload", routes.upload_file),
])

aiohttp.web.run_app(
    uploader,
    host=CONFIG.server.host,
    port=CONFIG.server.port,
)
