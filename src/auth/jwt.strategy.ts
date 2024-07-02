import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ignoreExpiration: false,
    //   secretOrKey: jwtConstants.secret,
    // });
    super({
      secretOrKeyProvider: passportJwtSecret({
        // cache: true,
        // rateLimit: false,
        // jwksRequestsPerMinute: 5,
        jwksUri: `https://id.meca.in.th/auth/realms/social/protocol/openid-connect/certs`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'account',
      issuer: `https://id.meca.in.th/auth/realms/social`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return payload;
  }
}