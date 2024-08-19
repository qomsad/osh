import { Issuer } from "openid-client";

export const OidcClient = Symbol("OidcClient");

export const OidcClientProvider = {
  provide: OidcClient,
  useFactory: async () => {
    const issuer = await Issuer.discover(process.env["OIDC_ISSUER_URL"]!);
    return new issuer.Client({
      client_id: process.env["OIDC_CLIENT_ID"]!,
      client_secret: process.env["OIDC_CLIENT_SECRET"],
      redirect_uris: [
        new URL(
          "/admin-api/auth/callback/",
          process.env["OIDC_REDIRECT_BASE_URL"],
        ).toString(),
      ],
    });
  },
};
