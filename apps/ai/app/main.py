import os
from typing import List

from fastapi import FastAPI, File, Form, UploadFile

from .schemas import (
    CoachChatRequest,
    CoachChatResponse,
    ImageAnalysisResponse,
    WorkoutRequest,
    WorkoutResponse
)
from .services.nutrition_db import estimate_nutrition
from .services.vision import compress_image_bytes, detect_foods_with_vision
from .services.workout import build_workout_schedule

app = FastAPI(title="NutriNova AI Engine", version="1.0.0")

COACH_PROMPT = os.getenv(
    "AI_COACH_SYSTEM_PROMPT",
    "You are an AI Nutrition and Fitness Coach. Analyze meals, generate workout plans, adjust nutrition, and guide users scientifically."
)


@app.get("/health")
def health():
    return {"status": "ok", "service": "nutrinova-ai"}


@app.post("/analyze-image", response_model=ImageAnalysisResponse)
async def analyze_image(image: UploadFile = File(...), user_goal: str = Form("maintenance")):
    if image.content_type not in {"image/jpeg", "image/png"}:
        return ImageAnalysisResponse(
            foods_detected=[],
            total_calories=0,
            macros={"protein": 0, "carbs": 0, "fat": 0},
            health_score=0,
            suggestions=["Upload a JPG or PNG image."]
        )

    raw = await image.read()
    compressed = compress_image_bytes(raw)
    detected_foods: List[str] = detect_foods_with_vision(compressed)

    nutrition = estimate_nutrition(detected_foods)
    if not nutrition["foods_detected"]:
        nutrition = estimate_nutrition(["Egg (Boiled)", "White Rice"]) 

    protein_target = 110 if user_goal == "muscle_gain" else 90
    protein_gap = max(0, protein_target - nutrition["macros"]["protein"])
    score_penalty = min(40, int(protein_gap / 3))
    health_score = max(40, 90 - score_penalty)

    suggestions = []
    if user_goal == "muscle_gain" and nutrition["macros"]["protein"] < 25:
        suggestions.append("Increase protein portion to support muscle gain.")
    if user_goal == "fat_loss" and nutrition["total_calories"] > 600:
        suggestions.append("Consider reducing calorie-dense portions for fat loss.")
    if not suggestions:
        suggestions.append("Meal looks balanced. Keep hydration and fiber intake high.")

    return ImageAnalysisResponse(
        foods_detected=nutrition["foods_detected"],
        total_calories=nutrition["total_calories"],
        macros=nutrition["macros"],
        health_score=health_score,
        suggestions=suggestions
    )


@app.post("/generate-workout", response_model=WorkoutResponse)
def generate_workout(payload: WorkoutRequest):
    schedule = build_workout_schedule(payload.training_days, payload.experience_level)
    return WorkoutResponse(schedule=schedule)


@app.post("/coach-chat", response_model=CoachChatResponse)
def coach_chat(payload: CoachChatRequest):
    message = payload.message.strip()
    if not message:
        return CoachChatResponse(reply="Share your meal, workout goal, or progress update to get guidance.")

    reply = (
        f"{COACH_PROMPT}\n\n"
        f"Guidance: Based on your message ('{message}'), prioritize a high-protein meal, "
        "complete your scheduled workout today, and aim for 7-8 hours of sleep for recovery."
    )
    return CoachChatResponse(reply=reply)
