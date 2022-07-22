import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';
import { AuthenticatedRequest } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  login(@Req() req: AuthenticatedRequest) {
    return this.authService.signIn(req.user);
  }
}
