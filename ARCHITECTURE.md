# NutriNova AI Architecture

## Request Flow
1. Next.js client calls Express API (`/api/*`)
2. Express validates/authenticates and forwards AI workloads to FastAPI
3. FastAPI performs food recognition + nutrition/workout logic
4. API stores user state in MongoDB and caches heavy responses in Redis
5. UI renders dashboard and analytics with low-latency state updates

## Services
- `apps/web` (Next.js 14)
- `apps/api` (Express modular REST)
- `apps/ai` (FastAPI AI engine)
- MongoDB (primary persistence)
- Redis (caching)

## Performance Rules Applied
- Image compression before AI inference
- Cached workout recommendations
- Payload limits and timeout handling
- Next.js App Router with optimized package imports

## Security Rules Applied
- Helmet hardening + CORS controls
- Rate limiting
- JWT access/refresh token architecture
- Password hashing via bcrypt
- Input validation via Zod/Pydantic
