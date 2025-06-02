from sqlalchemy.orm import Session
from typing import Optional

from app.models import models
from app.schemas import user_schemas
from app.core.security import get_password_hash

def get_user(db: Session, user_id: int) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100) -> list[models.User]:
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: user_schemas.UserCreate) -> models.User:
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name,
        age=user.age,
        income=user.income,
        is_active=True # Or False, to be activated via OTP. Let's make it True for now.
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user_active_status(db: Session, user_id: int, is_active: bool) -> Optional[models.User]:
    db_user = get_user(db, user_id=user_id)
    if db_user:
        db_user.is_active = is_active
        db.commit()
        db.refresh(db_user)
    return db_user

# Add other update functions if needed, e.g., update_user_profile, change_password
