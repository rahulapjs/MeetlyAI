from pydantic import BaseModel, Field
from typing import List, Optional


class ActionItem(BaseModel):
    task: str = Field(..., description="Actionable task extracted from the meeting")
    owner: Optional[str] = Field(
        None, description="Person responsible for the task"
    )
    priority: Optional[str] = Field(
        None, description="Priority level (High, Medium, Low)"
    )


class MeetingAnalysisResponse(BaseModel):
    summary: str = Field(..., description="Concise meeting summary")
    decisions: List[str] = Field(
        default_factory=list,
        description="Key decisions made during the meeting",
    )
    action_items: List[ActionItem] = Field(
        default_factory=list,
        description="Extracted action items with ownership and priority",
    )
