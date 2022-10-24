import aiohttp.web
import asyncpg

from uploader import contexts


__all__ = (
    "Uploader",
)


class Uploader(aiohttp.web.Application):

    pool: asyncpg.Pool

    def setup(self) -> None:
        self.cleanup_ctx.append(contexts.postgresql)
