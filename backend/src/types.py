import asyncpg
from starlite import Starlite as StarliteState


class State(StarliteState):
    pool: asyncpg.Pool | None
