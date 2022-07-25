import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '../auth.types';

@Injectable()
export class JwtLogoutStrategy extends PassportStrategy(
  Strategy,
  'jwt-logout',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET_KEY,
      ignoreExpiration: true,
    });
  }

  validate(payload: JwtPayload): number {
    return payload.sub;
  }
}
