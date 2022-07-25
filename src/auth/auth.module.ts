import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import loadEnv from '../shared/utils/loadEnv';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../tokens/tokens.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  LocalStrategy,
  JwtStrategy,
  JwtRefreshStrategy,
  JwtLogoutStrategy,
} from './strategies';

loadEnv();

@Module({
  imports: [UsersModule, TokensModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtLogoutStrategy,
  ],
})
export class AuthModule {}
