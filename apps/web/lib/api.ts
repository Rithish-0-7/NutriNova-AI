import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL,
  timeout: 25000
});

export type ScanResponse = {
  foods_detected: string[];
  total_calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  health_score: number;
  suggestions: string[];
};
