from litestar import Router

from src.routes.files.delete import delete_current_users_file, delete_users_file
from src.routes.files.get import get_current_users_file, get_current_users_files, get_users_file, get_users_files
from src.routes.files.patch import edit_current_users_file, edit_users_file
from src.routes.files.post import upload_files
from src.routes.tokens.post import create_token
from src.routes.users.delete import delete_current_user, delete_user
from src.routes.users.get import get_current_user, get_user
from src.routes.users.patch import edit_current_user, edit_user


__all__ = ["router"]


user_files_router = Router(
    path="/{user_id:str}/files",
    route_handlers=[
        get_users_file, get_users_files,
        edit_users_file,
        delete_users_file,
    ]
)
current_user_files_router = Router(
    path="/me/files",
    route_handlers=[
        get_current_users_file, get_current_users_files,
        edit_current_users_file,
        delete_current_users_file,
        upload_files,
    ]
)
users_router = Router(
    path="/users",
    route_handlers=[
        get_user, get_current_user,
        edit_user, edit_current_user,
        delete_user, delete_current_user,
        user_files_router, current_user_files_router,
    ]
)
tokens_router = Router(
    path="/tokens",
    route_handlers=[create_token]
)

router = Router(
    path="/api",
    security=[{"token": []}],
    route_handlers=[users_router, tokens_router]
)
