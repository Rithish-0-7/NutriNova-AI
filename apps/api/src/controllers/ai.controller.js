import axios from 'axios';
import { z } from 'zod';
import { Meal } from '../models/Meal.js';
import { Workout } from '../models/Workout.js';
import { getCache, setCache } from '../services/cache.service.js';
import { chatCoachAI, generateWorkoutAI, scanMealWithAI } from '../services/ai.service.js';

const workoutSchema = z.object({
  age: z.number().min(12).max(80),
  weight: z.number().min(30).max(300),
  height: z.number().min(100).max(250),
  fitness_goal: z.string(),
  experience_level: z.enum(['beginner', 'intermediate', 'advanced']),
  training_days: z.number().min(1).max(7)
});

export async function scanMeal(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image is required' });
    if (!['image/jpeg', 'image/png'].includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Only jpg/png images allowed' });
    }

    const result = await scanMealWithAI(req.forwardFormData, req.forwardHeaders);
    const userId = req.user?.sub;

    if (userId) {
      await Meal.create({
        userId,
        foodItems: result.foods_detected,
        calories: result.total_calories,
        macros: result.macros
      });
    }

    res.json(result);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res.status(504).json({
        foods_detected: ['Unknown meal'],
        total_calories: 0,
        macros: { protein: 0, carbs: 0, fat: 0 },
        health_score: 50,
        suggestions: ['AI analysis timed out. Try again with a clearer image.']
      });
    }
    next(error);
  }
}

export async function workoutProgram(req, res, next) {
  try {
    const payload = workoutSchema.parse(req.body);
    const cacheKey = `workout:${payload.experience_level}:${payload.training_days}:${payload.fitness_goal}`;
    const cached = await getCache(req.redis, cacheKey);
    if (cached) return res.json(cached);

    const result = await generateWorkoutAI(payload);

    if (req.user?.sub) {
      await Workout.create({ userId: req.user.sub, schedule: result.schedule || [] });
    }

    await setCache(req.redis, cacheKey, result, 1800);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function coachChat(req, res, next) {
  try {
    const message = z.object({ message: z.string().min(2) }).parse(req.body);
    const result = await chatCoachAI(message);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
