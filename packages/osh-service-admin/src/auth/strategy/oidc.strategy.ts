import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Client, Strategy, TokenSet, UserinfoResponse } from "openid-client";
import { AuthService } from "../auth.service";
import { UserDto } from "../dto/user.dto";
import { OidcClient } from "../provider/oidc-client.provider";

@Injectable()
export class OidcStrategy extends PassportStrategy(Strategy, "oidc") {
  constructor(
    @Inject(OidcClient) private readonly client: Client,
    private readonly service: AuthService,
  ) {
    super({ client });
  }

  async validate(tokens: TokenSet): Promise<any> {
    const userinfo: UserinfoResponse = await this.client.userinfo(tokens);

    const user: UserDto = {
      sub: userinfo.sub,
      tokenId: tokens.id_token,
      username: userinfo.preferred_username,
      email: userinfo.email,
      firstName: userinfo.given_name,
      middleName: userinfo.middle_name,
      lastName: userinfo.family_name,
      roles: process.env["OIDC_ROLES_PATH"]!.split(".").reduce(
        (acc: any, key) => {
          return acc && acc[key] !== undefined ? acc[key] : undefined;
        },
        userinfo,
      ),
    };
    return this.service.validate(user);
  }
}
