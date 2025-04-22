import redisClient from "../db/redis.db.js";

export const setKey = async (key: string, value: any, expireInSec = 3600) => {
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: expireInSec });
  } catch (err) {
    console.error('❌ Redis SET error:', err);
  }
};

export const getKey = async (key: string) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('❌ Redis GET error:', err);
    return null;
  }
};

export const delKey = async (key: string) => {
  try {
    await redisClient.del(key);
  } catch (err) {
    console.error('❌ Redis DEL error:', err);
  }
};
