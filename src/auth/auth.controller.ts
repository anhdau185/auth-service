import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';

import { concealCredentials } from '../users/users.utils';
import { LocalAuthGuard } from './local.guard';
import { AuthenticatedRequest } from './auth.types';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  login(@Req() req: AuthenticatedRequest) {
    return concealCredentials(req.user);
  }
}
