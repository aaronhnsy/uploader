from litestar import Router

from src.routes.tokens.post import create_token
from src.routes.users.id.delete import delete_user
from src.routes.users.id.get import get_user
from src.routes.users.id.patch import edit_user
from src.routes.users.id.uploads.delete import delete_upload
from src.routes.users.id.uploads.get import get_upload, get_uploads
from src.routes.users.id.uploads.patch import update_upload
from src.routes.users.me.delete import delete_current_user
from src.routes.users.me.get import get_current_user
from src.routes.users.me.patch import edit_current_user
from src.routes.users.me.uploads.delete import delete_upload_for_current_user
from src.routes.users.me.uploads.get import get_upload_for_current_user, get_uploads_for_current_user
from src.routes.users.me.uploads.patch import update_upload_for_current_user
from src.routes.users.me.uploads.post import create_uploads_for_current_user


__all__ = ["router"]


user_uploads_router = Router(
    path="", tags=["Uploads"],
    route_handlers=[
        get_uploads, get_upload,
        update_upload,
        delete_upload
    ]
)
current_user_uploads_router = Router(
    path="", tags=["Uploads (/me)"],
    route_handlers=[
        get_uploads_for_current_user, get_upload_for_current_user,
        create_uploads_for_current_user,
        update_upload_for_current_user,
        delete_upload_for_current_user,
    ]
)

users_router = Router(
    path="", tags=["Users"],
    route_handlers=[get_user, edit_user, delete_user]
)
current_user_router = Router(
    path="", tags=["User (/me)"],
    route_handlers=[get_current_user, edit_current_user, delete_current_user]
)

tokens_router = Router(
    path="/tokens", tags=["Tokens"],
    route_handlers=[create_token]
)

router = Router(
    path="/api", security=[{"token": []}],
    route_handlers=[
        users_router, current_user_router,
        user_uploads_router, current_user_uploads_router,
        tokens_router
    ]
)
