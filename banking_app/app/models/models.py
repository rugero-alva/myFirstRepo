from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta

from app.database import Base

# This Base will eventually be imported from app.database
# For now, defining it here to make the models self-contained for this step
# It will be removed from here when app.database is created.

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, index=True)
    age = Column(Integer) # For recommendation engine
    income = Column(Integer) # For recommendation engine
    is_active = Column(Boolean, default=True)
    # is_verified = Column(Boolean, default=False) # To be updated after OTP verification

    otps = relationship("OTP", back_populates="owner")
    chat_history = relationship("ChatHistory", back_populates="user")
    recommendation_logs = relationship("RecommendationLog", back_populates="user")

class OTP(Base):
    __tablename__ = "otps"

    id = Column(Integer, primary_key=True, index=True)
    otp_code = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, default=lambda: datetime.utcnow() + timedelta(minutes=10)) # OTP valid for 10 mins

    owner = relationship("User", back_populates="otps")

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="chat_history")

class RecommendationLog(Base):
    __tablename__ = "recommendation_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    # Storing recommendations as Text, could be JSON string
    recommendations = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="recommendation_logs")

# Example of how Base would be used if database.py existed:
# from app.database import Base
# class User(Base): ...
