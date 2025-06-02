from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Banking App"
    PROJECT_VERSION: str = "1.0.0"

    DATABASE_URL: str = "sqlite:///./banking_app.db" # Default to SQLite for simplicity
    # Example for PostgreSQL:
    # POSTGRES_USER: Optional[str] = "postgres"
    # POSTGRES_PASSWORD: Optional[str] = "password"
    # POSTGRES_SERVER: Optional[str] = "localhost"
    # POSTGRES_PORT: Optional[str] = "5432"
    # POSTGRES_DB: Optional[str] = "banking_db"
    # DATABASE_URL: Optional[str] = None # Will be assembled if POSTGRES_USER etc. are set

    # @validator("DATABASE_URL", pre=True)
    # def assemble_db_connection(cls, v: Optional[str], values: dict[str, Any]) -> Any:
    #     if isinstance(v, str):
    #         return v
    #     return PydanticPostgresDsn.build(
    #         scheme="postgresql",
    #         username=values.get("POSTGRES_USER"),
    #         password=values.get("POSTGRES_PASSWORD"),
    #         host=values.get("POSTGRES_SERVER"),
    #         port=values.get("POSTGRES_PORT"),
    #         path=f"/{values.get('POSTGRES_DB') or ''}",
    #     )

    SECRET_KEY: str = "a_very_secret_key_that_should_be_changed_in_production" # CHANGE THIS!
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    OTP_EXPIRE_MINUTES: int = 10

    # Email settings (placeholders for now)
    SMTP_TLS: bool = True
    SMTP_PORT: Optional[int] = None
    SMTP_HOST: Optional[str] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAILS_FROM_EMAIL: Optional[str] = None
    EMAILS_FROM_NAME: Optional[str] = None

    class Config:
        env_file = ".env" # Load .env file if present
        extra = "ignore"

settings = Settings()
