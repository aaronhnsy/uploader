import aiohttp.web

from uploader import utilities
from uploader.app import Uploader

from uploader.config import CONFIG


utilities.logging.setup()

uploader = Uploader()
uploader.setup()

aiohttp.web.run_app(
    uploader,
    host=CONFIG.application.host,
    port=CONFIG.application.port
)
