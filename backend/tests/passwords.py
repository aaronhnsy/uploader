import pathlib
import tomllib

import passlib.context


CONFIG = tomllib.loads(pathlib.Path("client.config.toml").read_text())
PASSWORD_CONTEXT = passlib.context.CryptContext(schemes=["argon2"])


def hash_password(password: str) -> str:
    return PASSWORD_CONTEXT.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return PASSWORD_CONTEXT.verify(password, hashed_password)


print(hash_password(CONFIG["password"]))
