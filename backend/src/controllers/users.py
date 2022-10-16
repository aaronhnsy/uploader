from starlite import Controller


__all__ = (
    "UsersController",
)


class UsersController(Controller):
    path = "/users"
