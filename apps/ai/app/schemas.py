from pydantic import BaseModel, Field
from typing import List


class Macros(BaseModel):
    protein: float
    carbs: float
    fat: float


class ImageAnalysisResponse(BaseModel):
    foods_detected: List[str]
    total_calories: float
    macros: Macros
    health_score: int = Field(ge=0, le=100)
    suggestions: List[str]


class WorkoutRequest(BaseModel):
    age: int
    weight: float
    height: float
    fitness_goal: str
    experience_level: str
    training_days: int


class WorkoutItem(BaseModel):
    day: str
    focus: str
    exercise: str
    sets: int
    reps: str
    rest_seconds: int


class WorkoutResponse(BaseModel):
    schedule: List[WorkoutItem]


class CoachChatRequest(BaseModel):
    message: str


class CoachChatResponse(BaseModel):
    reply: str
