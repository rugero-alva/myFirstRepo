from pydantic import BaseModel, EmailStr
from typing import Optional

# Base schema for common user attributes
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    age: Optional[int] = None
    income: Optional[int] = None

# Schema for user creation (request)
class UserCreate(UserBase):
    password: str

# Schema for user login (request)
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Schema for displaying user information (response)
# This inherits from UserBase and adds fields that are safe to return.
class User(UserBase):
    id: int
    is_active: bool

    class Config:
        # This allows Pydantic to work with SQLAlchemy models directly
        # Deprecated in Pydantic V2, orm_mode = True
        from_attributes = True


# Schema for user data as stored in DB (internal use, includes hashed_password)
class UserInDB(UserBase):
    id: int
    hashed_password: str
    is_active: bool

    class Config:
        from_attributes = True
