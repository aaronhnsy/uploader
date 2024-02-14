import aiohttp.web

from uploader import contexts, logger, middlewares, routes
from uploader.config import CONFIG


# logging
logger.setup()

# app
uploader = aiohttp.web.Application()

# contexts
uploader.cleanup_ctx.append(contexts.postgresql_context)

# middlewares
uploader.middlewares.append(middlewares.exception_middleware)

# routes
uploader.router.add_routes([
    aiohttp.web.post("/api/upload", routes.upload_file),
    aiohttp.web.get("/api/files", routes.get_files),
    aiohttp.web.post("/api/login", routes.login),
])

# run
aiohttp.web.run_app(
    uploader,
    host=CONFIG.server.host, port=CONFIG.server.port,
)
