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
    decisions, and action items.
    """

    transcript = clean_text(transcript)

    if not is_valid_transcript(transcript):
        raise ValueError("Transcript content is too short or invalid")

    system_prompt = """
You are an AI assistant that analyzes meeting transcripts.

Your task:
- Produce a concise summary
- Extract key decisions
- Extract action items with owner and priority if mentioned

STRICT RULES:
- Respond ONLY in valid JSON
- Do NOT include explanations
- Do NOT add extra fields
- If information is missing, use null or empty lists

JSON FORMAT:
{
  "summary": "string",
  "decisions": ["string"],
  "action_items": [
    {
      "task": "string",
      "owner": "string | null",
      "priority": "High | Medium | Low | null"
    }
  ]
}
"""

    response = client.models.generate_content(
        model=settings.GEMINI_MODEL,
        contents=[
            types.Content(
                role="user",
                parts=[
                    types.Part(text=system_prompt),
                    types.Part(text=f"\nTRANSCRIPT:\n{transcript}")
                ]
            )
        ],
        generation_config=types.GenerationConfig(
            temperature=0.2,
            response_mime_type="application/json"
        )
    )

    raw_text = response.text.strip()

    try:
        data: Dict[str, Any] = json.loads(raw_text)
    except json.JSONDecodeError as exc:
        raise ValueError("Gemini returned invalid JSON") from exc

    # Validate against Pydantic schema
    return MeetingAnalysisResponse(**data)
