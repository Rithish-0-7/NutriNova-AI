import dotenv from 'dotenv';

dotenv.config({ path: process.env.DOTENV_PATH || '.env' });

export const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || '',
  redisUrl: process.env.REDIS_URL || '',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'dev-access-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'dev-refresh-secret',
  aiEngineUrl: process.env.AI_ENGINE_URL || 'http://localhost:8001',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};
