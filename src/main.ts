import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // use Jwt Auth guard for all 
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // service manage .env
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}

void bootstrap();
