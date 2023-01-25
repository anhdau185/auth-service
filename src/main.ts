import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import loadEnv from './shared/utils/loadEnv';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = parseInt(process.env.PORT) || 3000;

  app.useStaticAssets(join(__dirname, './assets'));
  await app.listen(port);
}

loadEnv();
bootstrap();
