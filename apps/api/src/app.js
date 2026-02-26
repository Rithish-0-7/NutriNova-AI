import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.routes.js';
import aiRoutes from './routes/ai.routes.js';
import { errorHandler, notFound } from './middleware/error.js';
import { env } from './config/env.js';

export function createApp(redisClient) {
  const app = express();

  app.use(helmet());
  const isWildcardOrigin = env.corsOrigin === '*';
  app.use(
    cors({
      origin: isWildcardOrigin ? true : env.corsOrigin,
      credentials: !isWildcardOrigin
    })
  );
  app.use(compression());
  app.use(morgan('dev'));
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 300,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    req.redis = redisClient;
    next();
  });

  app.get('/health', (_, res) => {
    res.json({ status: 'ok', service: 'nutrinova-api' });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/ai', aiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
