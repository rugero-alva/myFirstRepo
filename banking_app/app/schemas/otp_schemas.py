from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class OTPBase(BaseModel):
    email: EmailStr # User's email to link the OTP

class OTPCreate(OTPBase):
    # No other fields needed, OTP is generated server-side
    pass

class OTPVerify(OTPBase):
    otp_code: str

# Schema for representing an OTP object, perhaps from the database
class OTP(BaseModel):
    id: int
    user_id: int
    otp_code: str # Should this be returned? Probably not to the end-user.
    created_at: datetime
    expires_at: datetime

    class Config:
        from_attributes = True

# Schema for response after OTP is sent successfully
class OTPSentResponse(BaseModel):
    message: str
    # email: EmailStr # Optionally return the email it was sent to for confirmation
