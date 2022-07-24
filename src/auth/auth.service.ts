import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import compareHash from '../shared/utils/compareHash';
import getNowTimestampSecs from '../shared/utils/getNowTimestampSecs';
import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';
import { User } from '../users/user.entity';
import { JwtPayload, ExtendedJwtPayload, JWTs } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokensService: TokensService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneUser({ username });
    if (user == null) return null;
    const isPasswordCorrect = await compareHash(password, user.password);
    return isPasswordCorrect ? user : null;
  }

  async issueTokens(user: User): Promise<JWTs> {
    const tokens = await this.generateTokens({
      name: user.name,
      sub: user.id,
    });
    await this.saveTokenToDatabase(tokens.refresh_token); // save refresh token to database for monitoring

    return tokens;
  }

  async reissueTokens(extendedPayload: ExtendedJwtPayload): Promise<JWTs> {
    const tokens = await this.generateTokens(extendedPayload);
    // TODO: Save hash of new refresh token in combination with user info to database
    // as well as invalidate old refresh token

    return tokens;
  }

  private async generateTokens(
    extendedPayload: ExtendedJwtPayload,
  ): Promise<JWTs> {
    const payload: JwtPayload = {
      name: extendedPayload.name,
      sub: extendedPayload.sub,
    };

    const refreshTokenExpiresAt = extendedPayload.exp_refresh;
    const accessTokenExpiresIn = parseInt(process.env.JWT_EXPIRATION_TIME);
    const refreshTokenExpiresIn =
      refreshTokenExpiresAt !== undefined
        ? this.getRemainingSecsTo(refreshTokenExpiresAt)
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

  private async saveTokenToDatabase(token: string): Promise<void> {
    const {
      sub: userId,
      iat: createdAt,
      exp: validUntil,
    } = this.decodeToken(token);

    await this.tokensService.saveNewTokenForUser({
      token,
      userId,
      createdAt,
      validUntil,
    });
  }

  private getRemainingSecsTo(targetTimestampSecs: number): number {
    return targetTimestampSecs - getNowTimestampSecs();
  }

  private decodeToken(token: string): Partial<JwtPayload> {
    return (this.jwtService.decode(token) as Required<JwtPayload>) || {};
  }
}
