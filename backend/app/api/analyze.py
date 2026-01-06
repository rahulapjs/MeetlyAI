from fastapi import APIRouter, HTTPException

from app.schemas.request import TranscriptRequest
from app.schemas.response import MeetingAnalysisResponse
from app.services.analyzer import analyze_transcript

router = APIRouter(tags=["Analysis"])


@router.post(
    "/analyze/transcript",
    response_model=MeetingAnalysisResponse,
)
def analyze_meeting(payload: TranscriptRequest):
    try:
        return analyze_transcript(payload.transcript)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Failed to analyze meeting transcript"
        )
