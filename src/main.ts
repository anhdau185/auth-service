import { NestFactory } from '@nestjs/core';

import loadEnv from './shared/utils/loadEnv';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT) || 3000;
  await app.listen(port);
}

loadEnv();
bootstrap();
