"use client";

import { useState } from 'react';
import { api, ScanResponse } from '@/lib/api';
import { useAppStore } from '@/store/useAppStore';

export default function ScannerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [goal, setGoal] = useState('fat_loss');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResponse | null>(null);
  const setNutrition = useAppStore((state) => state.setNutrition);

  const onScan = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('user_goal', goal);
    setLoading(true);
    try {
      const { data } = await api.post<ScanResponse>('/ai/scan-meal', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(data);
      setNutrition({
        calories: data.total_calories,
        macros: data.macros,
        healthScore: data.health_score
      });
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">AI Calorie Scanner</h1>
      <div className="card p-6 space-y-4">
        <label className="text-sm font-medium text-slate-700" htmlFor="meal-image">Meal image (JPG/PNG)</label>
        <input id="meal-image" className="input" type="file" accept="image/png,image/jpeg" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <input className="input" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Goal: fat_loss / muscle_gain" />
        <button className="btn-primary" onClick={onScan} disabled={!file || loading}>
          {loading ? 'Analyzing...' : 'Scan Meal'}
        </button>
      </div>
      {result ? (
        <div className="card p-6">
          <p className="text-sm text-muted">Detected Foods</p>
          <p className="mt-1 text-base text-slate-800">{result.foods_detected.join(', ')}</p>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-muted">Calories</p>
              <p className="text-lg font-semibold">{result.total_calories}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Protein</p>
              <p className="text-lg font-semibold">{result.macros.protein}g</p>
            </div>
            <div>
              <p className="text-xs text-muted">Carbs</p>
              <p className="text-lg font-semibold">{result.macros.carbs}g</p>
            </div>
            <div>
              <p className="text-xs text-muted">Fat</p>
              <p className="text-lg font-semibold">{result.macros.fat}g</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
