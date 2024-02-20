import logging
import logging.handlers

import colorama

from src.config import CONFIG


__all__ = ["setup"]


LOGGING = CONFIG.logging


class Formatter(logging.Formatter):

    def __init__(self, use_colours: bool) -> None:
        self.use_colours: bool = use_colours
        self.colours = LOGGING.stream_handler.colours.model_dump()
        if use_colours:
            fmt = f"{LOGGING.stream_handler.colours.time}[%(asctime)s]{colorama.Style.RESET_ALL} " \
                  f"%(colour)s[%(levelname)8s]{colorama.Style.RESET_ALL} " \
                  f"%(colour)s%(name)s{colorama.Style.RESET_ALL} - " \
                  f"%(message)s"
        else:
            fmt = "[%(asctime)s] [%(levelname)8s] %(name)s - %(message)s"
        super().__init__(fmt, datefmt="%Y-%m-%d %H:%M:%S")

    def format(self, record: logging.LogRecord) -> str:
        if self.use_colours:
            record.colour = self.colours.get(record.levelname.lower(), colorama.Fore.WHITE)
        return super().format(record)


def setup() -> None:
    # fix ansi escape codes on windows
    colorama.init()

    # make sure the logs directory exists if the file handler is enabled
    if LOGGING.file_handler.enabled is True and LOGGING.file_handler.path.exists() is False:
        LOGGING.file_handler.path.mkdir(parents=True, exist_ok=True)

    # set up handlers for each logger
    for name, _ in LOGGING.levels.model_fields.items():
        # setup basic logging details
        logger = logging.getLogger(name.replace("_", "."))
        logger.setLevel(getattr(LOGGING.levels, name))
        logger.propagate = False

        # configure the stream handler if enabled
        if LOGGING.stream_handler.enabled:
            stream_handler = logging.StreamHandler()
            stream_handler.setFormatter(Formatter(use_colours=LOGGING.stream_handler.use_colours))
            logger.addHandler(stream_handler)

        # configure the file handler if enabled
        if LOGGING.file_handler.enabled:
            file = LOGGING.file_handler.path / f"{name}.log"
            file_handler = logging.handlers.RotatingFileHandler(
                filename=file, mode="w", encoding="utf-8",
                maxBytes=LOGGING.file_handler.max_file_size,
                backupCount=LOGGING.file_handler.backup_count,
                delay=True,
            )
            if file.exists():
                file_handler.doRollover()
            file_handler.setFormatter(Formatter(use_colours=False))
            logger.addHandler(file_handler)
