import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379', // or your Redis URL
});

redisClient.on('error', (err) => console.error('❌ Redis Client Error', err));

(async () => {
  await redisClient.connect();
  console.log('✅ Redis Connected');
})();

export default redisClient;
