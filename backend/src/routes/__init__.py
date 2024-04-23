from litestar import Router

from .users import *


__all__ = ["router"]


user_router = Router(
    path="/users",
    route_handlers=[
        get_user,
        edit_user,
        delete_user
    ]
)
current_user_router = Router(
    path="/users",
    route_handlers=[
        get_current_user,
        edit_current_user,
        delete_current_user
    ]
)

user_files_router = Router(
    path="/users/{user_id:str}/files",
    route_handlers=[
        get_users_file, get_users_files,
        edit_users_file,
        delete_users_file,
    ]
)
current_user_files_router = Router(
    path="/users/me/files",
    route_handlers=[
        get_current_users_file, get_current_users_files,
        edit_current_users_file,
        delete_current_users_file,
        upload_files,
    ]
)

router = Router(
    path="/api",
    security=[{"token": []}],
    route_handlers=[
        user_router, current_user_router,
        user_files_router, current_user_files_router
    ]
)
