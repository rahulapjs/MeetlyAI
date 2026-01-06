import json
from typing import Any, Dict

from google import genai
from google.genai import types

from app.core.config import settings
from app.schemas.response import MeetingAnalysisResponse
from app.utils.text_utils import clean_text, is_valid_transcript

# Initialize Gemini client once
client = genai.Client(api_key=settings.GEMINI_API_KEY)


def analyze_transcript(transcript: str) -> MeetingAnalysisResponse:
    """
    Analyze meeting transcript and return structured summary,
    decisions, and action items using Gemini's native structured output.
    """

    transcript = clean_text(transcript)

    if not is_valid_transcript(transcript):
        raise ValueError("Transcript content is too short or invalid")

    system_instruction = (
        "You are an expert meeting analyst. Your task is to provide a concise summary, "
        "identify key decisions made, and list action items with their respective "
        "owners and priority levels."
    )

    try:
        # 3. Generate Content with Native Schema Support
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=f"TRANSCRIPT:\n{transcript}",
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.2,
                response_mime_type="application/json",
                # Passing the Pydantic class directly enables native structured output
                response_schema=MeetingAnalysisResponse,
            )
        )

        if response.parsed:
            return response.parsed
            
        return MeetingAnalysisResponse.model_validate_json(response.text)

    except Exception as exc:
        raise ValueError(f"Gemini analysis failed: {str(exc)}") from exc