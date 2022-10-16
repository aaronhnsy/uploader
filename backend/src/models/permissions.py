import enum

__all__ = (
    "Permissions",
)


class Permissions(enum.Flag):
    CREATE_FILE = enum.auto()
