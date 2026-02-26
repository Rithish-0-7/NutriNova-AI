import { createClient } from 'redis';

let client;

export async function getRedisClient(redisUrl) {
  if (!redisUrl) return null;
  if (client) return client;

  client = createClient({ url: redisUrl });
  client.on('error', (err) => {
    console.warn('Redis error:', err.message);
  });

  try {
    await client.connect();
    console.info('Redis connected');
    return client;
  } catch (error) {
    console.warn('Redis unavailable, continuing without cache.');
    client = null;
    return null;
  }
}
