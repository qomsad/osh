import { Inject, MiddlewareConsumer, Module } from "@nestjs/common";
import RedisStore from "connect-redis";
import session from "express-session";
import passport from "passport";
import { RedisClientType } from "redis";
import { AuthModule } from "./auth/auth.module";
import { RedisClient } from "./redis/provider/redis-client.provider";
import { RedisModule } from "./redis/redis.module";

@Module({
  imports: [AuthModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(@Inject(RedisClient) private readonly redis: RedisClientType) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new RedisStore({
            client: this.redis,
            prefix: "osh",
          }),
          secret: process.env["SESSION_SECRET"]!,
          resave: false,
          saveUninitialized: false,
          name: "osh-admin-session",
          rolling: true,
          cookie: {
            sameSite: (process.env["SESSION_COOKIE_POLICY"] as any) ?? "lax",
            httpOnly: true,
            maxAge: Number.parseInt(
              process.env["SESSION_COOKIE_TTL"] ?? "60000",
            ),
            secure: process.env["SESSION_COOKIE_HTTPS"] === "true",
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes("*");
  }
}
