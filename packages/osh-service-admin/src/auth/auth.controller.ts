import {
  Controller,
  Get,
  Inject,
  Redirect,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Client } from "openid-client";
import { AuthenticatedGuard } from "./guard/authenticated.guard";
import { AuthenticationGuard } from "./guard/authentication.guard";
import { OidcClient } from "./provider/oidc-client.provider";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(@Inject(OidcClient) private readonly client: Client) {}

  @Get("login")
  @UseGuards(AuthenticationGuard)
  public async login() {}

  @Get("callback")
  @Redirect("/")
  @UseGuards(AuthenticationGuard)
  public async callback() {}

  @Get("logout")
  @UseGuards(AuthenticatedGuard)
  public async logout(@Req() req: any, @Res() res: any) {
    const url = this.client.endSessionUrl({
      id_token_hint: req.user.tokenId,
      post_logout_redirect_uri: new URL(
        "/",
        process.env["OIDC_REDIRECT_BASE_URL"],
      ).toString(),
    });
    req.logout(async function (error: any) {
      if (error) {
        return error;
      }
      res.redirect(url);
    });
  }

  @Get("user")
  public async user(@Req() req: any) {
    return req.user;
  }
}
