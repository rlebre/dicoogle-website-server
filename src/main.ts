import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1', {
    exclude: [{ path: 'download/:hash', method: RequestMethod.GET }, 'download/static/:resource']
  });

  app.enableCors({ origin: configService.get('APP_URL') || '*' });

  await app.listen(configService.get('PORT') || 3000);
}

bootstrap();
