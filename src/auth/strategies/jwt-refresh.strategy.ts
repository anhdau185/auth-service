import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { JwtPayload, ExtendedJwtPayload } from '../auth.types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET_KEY,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): ExtendedJwtPayload {
    // TODO: Trigger the flow to validate refresh token to check if the token is blacklisted
    // if it is then invalidate it and throw UnauthorizedException here
    // const refreshToken = this.getBearerTokenFromRequest(req);

    return {
      sub: payload.sub,
      name: payload.name,
      exp_refresh: payload.exp,
    };
  }

  private getBearerTokenFromRequest(req: Request): string {
    return req.get('Authorization').replace('Bearer', '').trim();
  }
}
