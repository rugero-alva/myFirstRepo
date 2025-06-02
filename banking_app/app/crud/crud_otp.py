from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime, timedelta

from app.models import models
from app.schemas import otp_schemas # Will be used if we pass schema objects
from app.core.config import settings # For OTP_EXPIRE_MINUTES

def create_otp(db: Session, user_id: int, otp_code: str) -> models.OTP:
    # First, delete any existing OTPs for this user to ensure only one active OTP
    delete_all_otps_for_user(db, user_id=user_id)

    expires_at = datetime.utcnow() + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)
    db_otp = models.OTP(
        user_id=user_id,
        otp_code=otp_code, # Should this be hashed? For now, storing plain.
        expires_at=expires_at
    )
    db.add(db_otp)
    db.commit()
    db.refresh(db_otp)
    return db_otp

def get_active_otp_by_user_id(db: Session, user_id: int) -> Optional[models.OTP]:
    """
    Retrieves the latest, non-expired OTP for a user.
    OTP code itself is not checked here, only if an active one exists.
    """
    now = datetime.utcnow()
    return db.query(models.OTP).filter(
        models.OTP.user_id == user_id,
        models.OTP.expires_at > now,
        # models.OTP.used == False # If we add a 'used' flag
    ).order_by(models.OTP.created_at.desc()).first()

def get_otp_by_code_and_user_id(db: Session, otp_code: str, user_id: int) -> Optional[models.OTP]:
    """
    Retrieves a specific OTP by its code and user_id, checking for expiry.
    This is typically used during verification.
    """
    now = datetime.utcnow()
    return db.query(models.OTP).filter(
        models.OTP.user_id == user_id,
        models.OTP.otp_code == otp_code,
        models.OTP.expires_at > now,
        # models.OTP.used == False # If we add a 'used' flag
    ).first()

def mark_otp_as_used(db: Session, otp_id: int) -> Optional[models.OTP]:
    """
    Marks an OTP as used, effectively invalidating it.
    One way is to delete it, another is to set an 'is_used' flag.
    For simplicity, we'll delete it.
    """
    db_otp = db.query(models.OTP).filter(models.OTP.id == otp_id).first()
    if db_otp:
        db.delete(db_otp)
        db.commit()
    return db_otp # Returns the object before deletion or None if not found

def delete_otp(db: Session, otp_id: int) -> Optional[models.OTP]:
    db_otp = db.query(models.OTP).filter(models.OTP.id == otp_id).first()
    if db_otp:
        db.delete(db_otp)
        db.commit()
    return db_otp

def delete_all_otps_for_user(db: Session, user_id: int):
    db.query(models.OTP).filter(models.OTP.user_id == user_id).delete()
    db.commit()
