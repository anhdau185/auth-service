import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import compareHash from '../shared/utils/compareHash';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtPayload, ExtendedJwtPayload, Tokens } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneUser({ username });
    if (user == null) return null;
    const isPasswordCorrect = await compareHash(password, user.password);
    return isPasswordCorrect ? user : null;
  }

  async signIn(user: User): Promise<Tokens> {
    const payload: JwtPayload = {
      name: user.name,
      sub: user.id,
    };

    const tokens = await this.generateTokens(payload);
    // TODO: Save hash of refresh token in combination with user info to database

    return tokens;
  }

  async refreshTokens(extendedPayload: ExtendedJwtPayload): Promise<Tokens> {
    const tokens = await this.generateTokens(extendedPayload);
    // TODO: Save hash of new refresh token in combination with user info to database
    // as well as invalidate old refresh token

    return tokens;
  }

  private async generateTokens(
    extendedPayload: ExtendedJwtPayload,
  ): Promise<Tokens> {
    const payload: JwtPayload = {
      name: extendedPayload.name,
      sub: extendedPayload.sub,
    };

    const refreshTokenExpiresAt = extendedPayload.exp_refresh;
    const accessTokenExpiresIn = parseInt(process.env.JWT_EXPIRATION_TIME);
    const refreshTokenExpiresIn =
      refreshTokenExpiresAt !== undefined
        ? this.getRemainingSecondsTo(refreshTokenExpiresAt)
        : parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: accessTokenExpiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: refreshTokenExpiresIn,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private getRemainingSecondsTo(targetTimestamp: number): number {
    const nowTimestamp = Math.floor(Date.now() / 1000);
    return targetTimestamp - nowTimestamp;
  }
}
