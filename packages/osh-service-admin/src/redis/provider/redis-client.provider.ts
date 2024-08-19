import * as Redis from "redis";

export const RedisClient = Symbol("RedisClient");

export const RedisClientProvider = {
  provide: RedisClient,
  useFactory: async () => {
    const client = Redis.createClient({ url: process.env["REDIS_URL"] });
    await client.connect();
    return client;
  },
};
