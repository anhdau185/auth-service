import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { User } from '../users/user.entity';
import { AuthenticatedRequest } from './auth.types';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  login(@Req() req: AuthenticatedRequest<User>) {
    return this.authService.signIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  authorize(@Req() req: AuthenticatedRequest<Pick<User, 'id' | 'name'>>) {
    return req.user;
  }
}
