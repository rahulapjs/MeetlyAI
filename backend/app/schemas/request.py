from pydantic import BaseModel, Field


class TranscriptRequest(BaseModel):
    transcript: str = Field(
        ...,
        min_length=200,
        description="Full meeting transcript text"
    )
