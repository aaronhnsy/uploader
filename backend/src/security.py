from typing import Any

import itsdangerous
import passlib.context

from src.config import CONFIG


__all__ = [
    "AUTHENTICATION_SIGNER",
    "sign_token",
    "unsign_token",
    "PASSWORD_CONTEXT",
    "hash_password",
    "verify_password",
]


AUTHENTICATION_SIGNER: itsdangerous.URLSafeTimedSerializer = itsdangerous.URLSafeTimedSerializer(
    CONFIG.security.itsdangerous_secret,
    salt="authentication"
)


def sign_token(data: dict[str, Any]) -> str:
    return AUTHENTICATION_SIGNER.dumps(data)  # pyright: ignore


def unsign_token(token: str) -> dict[str, Any]:
    return AUTHENTICATION_SIGNER.loads(token)


PASSWORD_CONTEXT = passlib.context.CryptContext(schemes=["argon2"])


def hash_password(password: str) -> str:
    return PASSWORD_CONTEXT.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return PASSWORD_CONTEXT.verify(password, hashed_password)
