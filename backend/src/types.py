import asyncpg
from starlite import State as BaseState


class State(BaseState):
    pool: asyncpg.Pool | None
