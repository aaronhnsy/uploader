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


def sign_token(data: dict[str, Any]) -> str:
    return AUTHENTICATION_SIGNER.dumps(data)  # type: ignore


def unsign_token(token: str) -> dict[str, Any]:
    return AUTHENTICATION_SIGNER.loads(token)
