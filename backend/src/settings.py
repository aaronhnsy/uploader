from pydantic import BaseSettings, PostgresDsn, RedisDsn


class Settings(BaseSettings):
    POSTGRES_DSN: PostgresDsn
    REDIS_DSN: RedisDsn

    class Config(BaseSettings.Config):
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()  # type: ignore
