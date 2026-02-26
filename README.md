# NutriNova AI

Production-style monorepo for an AI-powered nutrition analyzer, calorie tracker, workout intelligence, and AI coach.

## Stack
- Frontend: Next.js 14 + TypeScript + Tailwind + Framer Motion + Recharts + Zustand
- Backend: Node.js + Express + MongoDB + Redis
- AI Engine: Python FastAPI + OpenAI Vision/GPT + USDA-backed nutrition matching

## Project Structure
- `apps/web` - UI and dashboard
- `apps/api` - REST API gateway, auth, nutrition/workout endpoints
- `apps/ai` - AI image analysis, workout generation, coaching endpoints

## Quick Start
1. Copy root env:
   - `cp .env.example .env` (PowerShell: `Copy-Item .env.example .env`)
2. Install JS deps:
   - `npm install`
3. Install AI deps:
   - `python -m pip install -r apps/ai/requirements.txt`
4. Run all services:
   - `npm run dev`

## Security & Reliability Defaults
- JWT auth with refresh tokens
- Input validation and payload size limits
- API rate limiting and helmet hardening
- Graceful AI timeout handling and fallback responses
- Image validation before AI processing

## Notes
- Connect MongoDB Atlas/Redis/Cloudinary/OpenAI via `.env` for production.
- Current implementation includes smart fallbacks for local development without external keys.
