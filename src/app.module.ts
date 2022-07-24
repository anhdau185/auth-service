import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getOrmConfig } from './db/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig()),
    UsersModule,
    AuthModule,
    TokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
