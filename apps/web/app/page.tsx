"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionFade } from '@/components/layout/SectionFade';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const features = [
  'Photo Food Scanner',
  'AI Workout Generator',
  'Nutrition Intelligence',
  'Progress Analytics'
];

export default function LandingPage() {
  return (
    <div className="space-y-8 pb-8 pt-6">
      <SectionFade className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <p className="text-sm font-medium text-emerald">Your AI Powered Nutrition & Fitness Coach</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-100 md:text-5xl">
            Track calories, scan meals, and receive intelligent workout guidance.
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-300">
            NutriNova AI combines meal recognition, macro insights, and adaptive workout coaching in one minimal, high-performance dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
            <Link href="/scanner">
              <Button variant="secondary">Scan Meal</Button>
            </Link>
          </div>
        </motion.div>

        <Card className="overflow-hidden p-0">
          <div className="h-full bg-brand-gradient p-6 text-white">
            <p className="text-xs uppercase tracking-wide text-white/80">AI Fitness Core</p>
            <h2 className="mt-3 text-2xl font-semibold">Daily insights that drive measurable change.</h2>
            <ul className="mt-5 space-y-2 text-sm text-white/90">
              <li>• Meal detection with macro estimate</li>
              <li>• Goal-aware workout plans</li>
              <li>• Coach chat with actionable guidance</li>
              <li>• Analytics across nutrition and training</li>
            </ul>
          </div>
        </Card>
      </SectionFade>

      <SectionFade delay={0.1}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <motion.div key={feature} whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
              <Card>
                <p className="text-sm font-medium text-slate-200">{feature}</p>
                <p className="mt-2 text-xs text-slate-400">Fast interactions, minimal clicks, and clean mobile-first experience.</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionFade>
    </div>
  );
}
