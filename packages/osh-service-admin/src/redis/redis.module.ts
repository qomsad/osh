import { Module } from "@nestjs/common";
import {
  RedisClient,
  RedisClientProvider,
} from "./provider/redis-client.provider";

@Module({
  providers: [RedisClientProvider],
  exports: [RedisClient],
})
export class RedisModule {}
