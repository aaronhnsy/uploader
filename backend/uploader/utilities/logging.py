from __future__ import annotations

import logging
import logging.handlers
import pathlib

import colorama

from uploader import utilities
from uploader.config import CONFIG


__all__ = (
    "setup",
)


class Formatter(logging.Formatter):

    def __init__(self, use_colours: bool) -> None:
        self._use_colours: bool = use_colours

        if use_colours:
            fmt = f"{CONFIG.logging.stream_handler.colours.time}%(asctime)s{colorama.Style.RESET_ALL} - " \
                  f"%(colour)s%(levelname)8s{colorama.Style.RESET_ALL} - " \
                  f"%(colour)s%(name)s{colorama.Style.RESET_ALL} - " \
                  f"%(message)s"
        else:
            fmt = "[%(asctime)s] [%(levelname)8s] %(name)s - %(message)s"

        super().__init__(fmt, datefmt="%Y-%m-%d %H:%M:%S")

    def format(self, record: logging.LogRecord) -> str:
        if self._use_colours:
            record.colour = getattr(
                CONFIG.logging.stream_handler.colours,
                record.levelname.lower(),
                colorama.Fore.WHITE
            )
        return super().format(record)


def setup() -> None:

    colorama.init(autoreset=True)

    loggers = {
        "uploader": logging.getLogger("uploader"),
        "aiohttp":  logging.getLogger("aiohttp"),
    }
    loggers["uploader"].setLevel(CONFIG.logging.levels.uploader)
    loggers["aiohttp"].setLevel(CONFIG.logging.levels.aiohttp)

    path = pathlib.Path(CONFIG.logging.file_handler.path)
    if not path.exists():
        path.mkdir(parents=True, exist_ok=True)

    backup_count = CONFIG.logging.file_handler.backup_count
    max_bytes = utilities.parse_filesize(CONFIG.logging.file_handler.max_file_size)

    for name, logger in loggers.items():

        if CONFIG.logging.file_handler.enabled:
            file = (path / f"{name}.log")
            file_handler = logging.handlers.RotatingFileHandler(
                filename=file, maxBytes=max_bytes, backupCount=backup_count,
                mode="w", encoding="utf-8", delay=True,
            )
            if file.exists():
                file_handler.doRollover()

            file_handler.setFormatter(Formatter(use_colours=False))
            logger.addHandler(file_handler)

        if CONFIG.logging.stream_handler.enabled:
            stream_handler = logging.StreamHandler()
            stream_handler.setFormatter(Formatter(use_colours=CONFIG.logging.stream_handler.use_colours))
            logger.addHandler(stream_handler)
