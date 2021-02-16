import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(configService.get('PORT'));
}
bootstrap();
