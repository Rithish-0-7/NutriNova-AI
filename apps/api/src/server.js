import { createApp } from './app.js';
import { connectMongo } from './config/db.js';
import { env } from './config/env.js';
import { getRedisClient } from './config/redis.js';

async function bootstrap() {
  await connectMongo(env.mongodbUri);
  const redisClient = await getRedisClient(env.redisUrl);

  const app = createApp(redisClient);
  const startServer = (port) => {
    const server = app
      .listen(port, () => {
        console.info(`API running on http://localhost:${port}`);
      })
      .on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
          const nextPort = port + 1;
          console.warn(`Port ${port} is in use. Retrying on ${nextPort}...`);
          startServer(nextPort);
          return;
        }
        throw error;
      });

    return server;
  };

  startServer(env.port);
}

bootstrap().catch((error) => {
  console.error('Failed to start API:', error);
  process.exit(1);
});
