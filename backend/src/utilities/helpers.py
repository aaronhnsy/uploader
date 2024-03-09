from typing import Any

from itsdangerous import URLSafeTimedSerializer

from src.config import CONFIG


__all__ = [
    "AUTHENTICATION_SIGNER",
    "sign_token",
    "unsign_token",
]

AUTHENTICATION_SIGNER: URLSafeTimedSerializer = URLSafeTimedSerializer(
    CONFIG.security.itsdangerous_secret,
    salt="authentication"
)


def sign_token(data: dict[str, Any], max_age: int | None = None) -> str:
    return AUTHENTICATION_SIGNER.dumps(data, max_age=max_age)  # type: ignore


def unsign_token(token: str) -> dict[str, Any]:
    return AUTHENTICATION_SIGNER.loads(token)
