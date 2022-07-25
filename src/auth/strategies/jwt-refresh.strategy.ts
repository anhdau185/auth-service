import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { AuthService } from '../auth.service';
import { JwtPayload, ExtendedJwtPayload } from '../auth.types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET_KEY,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<ExtendedJwtPayload> {
    const refreshToken = this.getBearerTokenFromRequest(req);
    await this.rejectIfUnauthenticRefreshToken(refreshToken);

    return {
      sub: payload.sub,
      name: payload.name,
      exp_refresh: payload.exp,
    };
  }

  private async rejectIfUnauthenticRefreshToken(token: string): Promise<void> {
    const isTokenAuthentic = await this.authService.verifyRefreshToken(token);

    if (isTokenAuthentic) return;

    await this.authService.revokeAccessWithToken(token);
    throw new UnauthorizedException('Unauthentic token');
  }

  private getBearerTokenFromRequest(req: Request): string {
    return req.get('Authorization').replace('Bearer', '').trim();
  }
}
