from litestar import Router

from src.routes.tokens.post import create_token
from src.routes.users.id.delete import delete_user
from src.routes.users.id.files.delete import delete_users_file
from src.routes.users.id.files.get import get_users_file, get_users_files
from src.routes.users.id.files.patch import edit_users_file
from src.routes.users.id.get import get_user
from src.routes.users.id.patch import edit_user
from src.routes.users.me.delete import delete_current_user
from src.routes.users.me.files.delete import delete_current_users_file
from src.routes.users.me.files.get import get_current_users_file, get_current_users_files
from src.routes.users.me.files.patch import edit_current_users_file
from src.routes.users.me.files.post import upload_files
from src.routes.users.me.get import get_current_user
from src.routes.users.me.patch import edit_current_user


__all__ = ["router"]


user_files_router = Router(
    path="",
    tags=["Files"],
    route_handlers=[
        get_users_files, get_users_file,
        edit_users_file,
        delete_users_file,
    ]
)
current_user_files_router = Router(
    path="",
    tags=["Current User Files"],
    route_handlers=[
        get_current_users_files, get_current_users_file,
        upload_files,
        edit_current_users_file,
        delete_current_users_file,
    ]
)

users_router = Router(
    path="",
    tags=["Users"],
    route_handlers=[get_user, edit_user, delete_user]
)
current_user_router = Router(
    path="",
    tags=["Current User"],
    route_handlers=[get_current_user, edit_current_user, delete_current_user]
)

tokens_router = Router(
    path="/tokens",
    route_handlers=[create_token]
)

router = Router(
    path="/api",
    security=[{"token": []}],
    route_handlers=[
        users_router, current_user_router,
        user_files_router, current_user_files_router,
        tokens_router
    ]
)
