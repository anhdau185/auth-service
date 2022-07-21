import { NestFactory } from '@nestjs/core';

import setUpEnv from './shared/utils/setUpEnv';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT) || 3000;
  await app.listen(port);
}

setUpEnv();
bootstrap();
