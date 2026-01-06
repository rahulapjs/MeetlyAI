import re


def clean_text(text: str) -> str:
    """
    Normalize transcript text by removing excessive whitespace.
    """
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def is_valid_transcript(text: str, min_length: int = 200) -> bool:
    """
    Validate transcript length to avoid low-quality AI output.
    """
    return bool(text and len(text.strip()) >= min_length)
