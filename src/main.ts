import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/api/uploads',
  });

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({ origin: true, credentials: true });

  await app.listen(process.env.PORT ?? 4000, () => {
    console.log(`Server start on port: ${process.env.PORT}`);
  });
}
bootstrap();
