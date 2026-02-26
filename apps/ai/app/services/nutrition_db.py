from dataclasses import dataclass
from typing import Dict, List


DATASET_TEXT = [
    "Food: Egg (Boiled) | Calories:78 | Protein:6.3g | Carbs:0.6g | Fat:5.3g | Fiber:0g | Category:Protein",
    "Food: White Rice | Calories:130 | Protein:2.7g | Carbs:28g | Fat:0.3g | Category:Carbohydrate",
    "Food: Paneer | Calories:265 | Protein:18g | Carbs:3g | Fat:21g | Category:ProteinFat",
    "Food: Banana | Calories:105 | Protein:1.3g | Carbs:27g | Fat:0.3g | Category:Fruit"
]


@dataclass
class FoodItem:
    name: str
    calories: float
    protein: float
    carbs: float
    fat: float


def _extract_float(value: str) -> float:
    return float(value.replace("g", "").strip())


def parse_dataset() -> Dict[str, FoodItem]:
    items: Dict[str, FoodItem] = {}
    for row in DATASET_TEXT:
        parts = [part.strip() for part in row.split("|")]
        name = parts[0].split(":", 1)[1].strip()
        calories = float(parts[1].split(":", 1)[1].strip())
        protein = _extract_float(parts[2].split(":", 1)[1])
        carbs = _extract_float(parts[3].split(":", 1)[1])
        fat = _extract_float(parts[4].split(":", 1)[1])
        items[name.lower()] = FoodItem(name=name, calories=calories, protein=protein, carbs=carbs, fat=fat)
    return items


FOOD_INDEX = parse_dataset()


def estimate_nutrition(food_names: List[str], multiplier: float = 1.0):
    total_calories = 0.0
    total_protein = 0.0
    total_carbs = 0.0
    total_fat = 0.0
    resolved = []

    for detected in food_names:
        key = detected.lower()
        match = FOOD_INDEX.get(key)
        if not match:
            continue
        resolved.append(match.name)
        total_calories += match.calories * multiplier
        total_protein += match.protein * multiplier
        total_carbs += match.carbs * multiplier
        total_fat += match.fat * multiplier

    return {
        "foods_detected": resolved,
        "total_calories": round(total_calories, 1),
        "macros": {
            "protein": round(total_protein, 1),
            "carbs": round(total_carbs, 1),
            "fat": round(total_fat, 1)
        }
    }
