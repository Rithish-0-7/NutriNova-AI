const memoryCache = new Map();

export async function getCache(redis, key) {
  if (redis) {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  }
  return memoryCache.has(key) ? memoryCache.get(key) : null;
}

export async function setCache(redis, key, value, ttlSeconds = 300) {
  if (redis) {
    await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });
    return;
  }
  memoryCache.set(key, value);
  setTimeout(() => memoryCache.delete(key), ttlSeconds * 1000).unref?.();
}
