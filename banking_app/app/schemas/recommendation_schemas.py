from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from datetime import datetime

# Schema for a single recommendation item
class RecommendationItem(BaseModel):
    item_id: str # e.g., product_code, service_name
    name: str
    description: Optional[str] = None
    score: Optional[float] = None # Relevance score
    details: Optional[Dict[str, Any]] = None # Any other relevant details

# Schema for the request to the recommendation endpoint.
# Might be empty if recommendations are purely based on the authenticated user.
# Could include context like 'current_product_view' etc. in a more advanced scenario.
class RecommendationRequest(BaseModel):
    user_id: Optional[int] = None # Usually inferred from JWT token
    # context: Optional[Dict[str, Any]] = None # e.g., {'current_page': 'accounts'}

# Schema for the response from the recommendation endpoint
class RecommendationResponse(BaseModel):
    user_id: int
    recommendations: List[RecommendationItem]
    timestamp: datetime
    # model_version: Optional[str] = None # If we version our recommendation models

# Schema for logging a recommendation event (similar to RecommendationLog model)
class RecommendationLogSchema(BaseModel):
    id: int
    user_id: int
    recommendations: str # Storing as JSON string, matching the model
    timestamp: datetime

    class Config:
        from_attributes = True
