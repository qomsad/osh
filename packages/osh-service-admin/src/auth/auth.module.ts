import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { OidcClientProvider } from "./provider/oidc-client.provider";
import { SessionSerializationProvider } from "./provider/session-serialization.provider";
import { OidcStrategy } from "./strategy/oidc.strategy";

@Module({
  imports: [
    PassportModule.register({ session: true, defaultStrategy: "oidc" }),
  ],
  controllers: [AuthController],
  providers: [
    OidcClientProvider,
    SessionSerializationProvider,
    OidcStrategy,
    AuthService,
  ],
})
export class AuthModule {}
