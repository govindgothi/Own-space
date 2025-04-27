import { createClient } from 'redis';

const client = createClient({
  url: 'redis://127.0.0.1:6379',
});

client.on('connect', () => {
  console.log('Connected to Redis...');
});

client.on('error', (err) => {
  console.log('Redis error: ' + err);
});

async function run() {
  await client.connect();  // Connect the client

  // Set a value
  await client.set('mykey', 'Hello, Redis!');

  // Get a value
  const value = await client.get('mykey');
  console.log(value); // Should output "Hello, Redis!"

  await client.quit(); // Close the connection gracefully
}

export default client