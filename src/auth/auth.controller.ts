import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';

import { User } from '../users/user.entity';
import { AuthenticatedRequest, ExtendedJwtPayload } from './auth.types';
import { AuthService } from './auth.service';
import {
  LocalAuthGuard,
  JwtAuthGuard,
  JwtRefreshAuthGuard,
  JwtLogoutAuthGuard,
} from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  login(@Req() req: AuthenticatedRequest<User>) {
    return this.authService.issueTokens(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  authorize(@Req() req: AuthenticatedRequest<Pick<User, 'id' | 'name'>>) {
    return req.user;
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @HttpCode(200)
  refresh(@Req() req: AuthenticatedRequest<ExtendedJwtPayload>) {
    return this.authService.reissueTokens(req.user);
  }

  @UseGuards(JwtLogoutAuthGuard)
  @Post('logout')
  @HttpCode(204)
  logout(@Req() req: AuthenticatedRequest<number>) {
    this.authService.revokeAccess({ usingUserId: req.user });
  }
}
