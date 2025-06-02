from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

# Base schema for chat message attributes
class ChatMessageBase(BaseModel):
    message: str

# Schema for creating a new chat message (user input)
class ChatMessageCreate(ChatMessageBase):
    pass

# Schema for representing a chat message in history or as a response
class ChatMessage(ChatMessageBase):
    id: int
    user_id: int # To link message to a user
    response: Optional[str] = None # Bot's response to this message
    timestamp: datetime

    class Config:
        from_attributes = True

# Schema for the chat endpoint's request body
class ChatRequest(BaseModel):
    message: str

# Schema for the chat endpoint's response body
class ChatResponse(BaseModel):
    user_message: str
    bot_response: str
    timestamp: datetime
    # session_id: Optional[str] = None # If we want to manage chat sessions explicitly
