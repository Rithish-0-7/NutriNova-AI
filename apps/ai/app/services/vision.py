import base64
import os
from io import BytesIO
from typing import List

from PIL import Image

try:
    from openai import OpenAI
except Exception:
    OpenAI = None


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) if OpenAI and os.getenv("OPENAI_API_KEY") else None


def compress_image_bytes(image_bytes: bytes, max_size=(1024, 1024), quality=75) -> bytes:
    img = Image.open(BytesIO(image_bytes)).convert("RGB")
    img.thumbnail(max_size)
    output = BytesIO()
    img.save(output, format="JPEG", quality=quality, optimize=True)
    return output.getvalue()


def detect_foods_with_vision(image_bytes: bytes, fallback: List[str] | None = None) -> List[str]:
    fallback_foods = fallback or ["Egg (Boiled)", "White Rice", "Banana"]
    if not client:
        return fallback_foods

    encoded = base64.b64encode(image_bytes).decode("utf-8")
    prompt = (
        "Identify food items visible in this meal image. Return only a comma-separated list "
        "of item names that are most likely present."
    )

    try:
        response = client.responses.create(
            model="gpt-4.1-mini",
            input=[
                {
                    "role": "user",
                    "content": [
                        {"type": "input_text", "text": prompt},
                        {"type": "input_image", "image_url": f"data:image/jpeg;base64,{encoded}"}
                    ]
                }
            ]
        )
        text = response.output_text or ""
        foods = [item.strip() for item in text.split(",") if item.strip()]
        return foods if foods else fallback_foods
    except Exception:
        return fallback_foods
