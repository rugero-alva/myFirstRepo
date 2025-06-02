from datetime import datetime, timedelta, timezone
from typing import Optional, Any
import secrets # For OTP generation
import logging # For placeholder email sending

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# JWT Token Handling
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict[str, Any]]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None

# OTP Generation and Verification
def generate_otp_code(length: int = 6) -> str:
    """Generates a random numeric OTP of specified length."""
    return "".join([secrets.choice("0123456789") for _ in range(length)])

# Placeholder for sending OTP email
# In a real application, this would use an email library (e.g., aiosmtplib, fastapi-mail)
# and integrate with the SMTP settings from config.py
async def send_email_otp(email_to: str, otp_code: str):
    """
    Placeholder function to simulate sending an OTP email.
    In a real app, integrate with an email sending service.
    """
    logging.info(f"Simulating OTP email to {email_to}: Your OTP is {otp_code}")
    print(f"DEBUG: OTP for {email_to} is {otp_code}") # For easy debugging during development
    # In a real scenario, you would return True/False based on success
    return True

# Note: The actual verification of an OTP will involve:
# 1. Retrieving the stored OTP for the user from the database.
# 2. Checking if it's expired.
# 3. Comparing the provided OTP with the stored one.
# This logic will typically reside in a service or CRUD operation, not directly here.
# This file provides the generation and the (placeholder) sending mechanism.
