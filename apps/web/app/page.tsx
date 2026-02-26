"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <section className="grid gap-6 py-10 md:grid-cols-2 md:py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <p className="text-sm font-medium text-accent">AI Nutrition + Fitness Intelligence</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Transform meals and workouts into measurable progress.
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Scan food photos, auto-track calories and macros, generate personalized workout plans, and get real-time coaching.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/dashboard" className="btn-primary">
            Open Dashboard
          </Link>
          <Link href="/scanner" className="btn-secondary">
            Try Calorie Scanner
          </Link>
        </div>
      </motion.div>
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-slate-900">Core Features</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          <li>• Photo-based food recognition with macro estimation</li>
          <li>• AI workout generator by level and training days</li>
          <li>• Adaptive nutrition suggestions by goal</li>
          <li>• Progress analytics and health score tracking</li>
        </ul>
      </div>
    </section>
  );
}
