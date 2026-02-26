from typing import List


def _template(experience_level: str):
    if experience_level == "beginner":
        return [
            ("Full Body", "Squat"),
            ("Full Body", "Push-Up"),
            ("Full Body", "Dumbbell Row")
        ]
    if experience_level == "intermediate":
        return [
            ("Push", "Bench Press"),
            ("Pull", "Pull-Up"),
            ("Legs", "Romanian Deadlift")
        ]
    return [
        ("Chest + Triceps", "Bench Press"),
        ("Back + Biceps", "Barbell Row"),
        ("Legs", "Back Squat"),
        ("Shoulders", "Overhead Press"),
        ("Upper Hypertrophy", "Incline Dumbbell Press"),
        ("Lower Hypertrophy", "Leg Press")
    ]


def build_workout_schedule(training_days: int, experience_level: str) -> List[dict]:
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    plan = _template(experience_level)
    result = []

    for i in range(min(training_days, len(days))):
        focus, exercise = plan[i % len(plan)]
        result.append(
            {
                "day": days[i],
                "focus": focus,
                "exercise": exercise,
                "sets": 4,
                "reps": "8-10",
                "rest_seconds": 90
            }
        )

    return result
