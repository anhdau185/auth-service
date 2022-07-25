import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import compareHash from '../shared/utils/compareHash';
import getTokenSignature from '../shared/utils/getTokenSignature';
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

  async verifyRefreshToken(token: string): Promise<boolean> {
    const { sub: userId } = this.decodeToken(token);
    const tokenData = await this.tokensService.findOneToken({ userId });

    if (tokenData == null) return false;

    const signaturesMatchExactly = await compareHash(
      getTokenSignature(token),
      tokenData.token,
    );
    return signaturesMatchExactly;
  }

  async issueTokens(user: User): Promise<JWTs> {
    const tokens = await this.generateTokens({
      name: user.name,
      sub: user.id,
    });
    await this.monitorTokenServerSide(tokens.refresh_token); // save new refresh token to database for monitoring

    return tokens;
  }

  async reissueTokens(extendedPayload: ExtendedJwtPayload): Promise<JWTs> {
    const tokens = await this.generateTokens(extendedPayload);
    await this.monitorTokenServerSide(tokens.refresh_token); // save renewed refresh token to database for monitoring

    return tokens;
  }

  async revokeAccessWithUserId(userId: number): Promise<void> {
    this.tokensService.deleteIfExists({ userId });
  }

  async revokeAccessWithToken(token: string): Promise<void> {
    const { sub: userId } = this.decodeToken(token);
    this.revokeAccessWithUserId(userId);
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

  private async monitorTokenServerSide(token: string): Promise<void> {
    const {
      sub: userId,
      iat: createdAt,
      exp: validUntil,
    } = this.decodeToken(token);

    this.tokensService.saveNewTokenForUser({
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
