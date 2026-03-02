"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';
import { api, ScanResponse } from '@/lib/api';
import { useAppStore } from '@/store/useAppStore';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionFade } from '@/components/layout/SectionFade';
import { UploadDropzone } from '@/components/forms/UploadDropzone';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { ScannerResultCard } from '@/components/ai/ScannerResultCard';

export default function ScannerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [goal, setGoal] = useState('fat_loss');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const setNutrition = useAppStore((state) => state.setNutrition);

  const onFileSelected = (nextFile: File) => {
    setFile(nextFile);
    setPreviewUrl(URL.createObjectURL(nextFile));
    setErrorMessage('');
  };

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
      setErrorMessage('');
    } catch {
      setResult(null);
      setErrorMessage('Scan failed. Please retry with a clear image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="AI Scanner Command" subtitle="Drop an image, run AI detection, and review nutrition intelligence instantly." />

      <SectionFade className="grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
        <Card title="Upload Command" subtitle="Drag/drop or trigger camera scan">
          <div className="space-y-4">
            <UploadDropzone onFileSelected={onFileSelected} selectedFileName={file?.name} />
            <Input label="Goal" value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="fat_loss / muscle_gain / maintenance" />
            <div className="flex flex-wrap gap-2">
              <Button onClick={onScan} disabled={!file || loading}>
                <Sparkles className="h-4 w-4" />
                {loading ? 'Analyzing...' : 'Run AI Scan'}
              </Button>
              <Button variant="secondary">
                <Camera className="h-4 w-4" />
                Camera Scan
              </Button>
            </div>
            {loading ? (
              <div className="surface-muted flex items-center gap-2 p-3 text-xs text-cyan">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
                AI processing in progress...
              </div>
            ) : null}
            {errorMessage ? <p className="text-xs text-rose-400">{errorMessage}</p> : null}
          </div>
        </Card>

        <Card title="Live Preview" subtitle="Image + nutrition response">
          <div className="space-y-4">
            {previewUrl ? (
              <div className="relative h-48 overflow-hidden rounded-2xl border border-cyan/20">
                <Image src={previewUrl} alt="Meal preview" fill className="object-cover" unoptimized />
              </div>
            ) : (
              <div className="surface-muted flex h-48 items-center justify-center text-sm text-slate-400">
                Live image preview appears here
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </div>
            ) : null}

            {result ? (
              <ScannerResultCard
                foods={result.foods_detected}
                calories={result.total_calories}
                protein={result.macros.protein}
                carbs={result.macros.carbs}
                fat={result.macros.fat}
                healthScore={result.health_score}
              />
            ) : null}
          </div>
        </Card>
      </SectionFade>
    </div>
  );
}
