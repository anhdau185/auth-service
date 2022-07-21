import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CredentialsDto } from './credentials.dto';

@Controller('auth')
export class AuthController {
  private readonly AUTHENTICATION_SUCCESS = 'Authentication successful';
  private readonly AUTHENTICATION_FAILURE =
    'Authentication failed, please check your credentials';

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: CredentialsDto) {
    const result = await this.authService.validateUser(
      credentials.username,
      credentials.password,
    );

    return {
      result,
      message: result
        ? this.AUTHENTICATION_SUCCESS
        : this.AUTHENTICATION_FAILURE,
    };
  }
}
