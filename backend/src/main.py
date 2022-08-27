from starlite import Starlite

from src.controllers import *


app = Starlite(
    route_handlers=[FileController]
)
