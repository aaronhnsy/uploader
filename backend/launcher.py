import aiohttp.web

from uploader import utilities
from uploader.app import Uploader


utilities.logging.setup()

uploader = Uploader()
uploader.setup()

aiohttp.web.run_app(uploader)
