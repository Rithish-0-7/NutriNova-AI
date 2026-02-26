import axios from 'axios';
import { env } from '../config/env.js';

const aiClient = axios.create({
  baseURL: env.aiEngineUrl,
  timeout: 20000
});

export async function scanMealWithAI(formData, headers) {
  const { data } = await aiClient.post('/analyze-image', formData, { headers });
  return data;
}

export async function generateWorkoutAI(payload) {
  const { data } = await aiClient.post('/generate-workout', payload);
  return data;
}

export async function chatCoachAI(payload) {
  const { data } = await aiClient.post('/coach-chat', payload);
  return data;
}
