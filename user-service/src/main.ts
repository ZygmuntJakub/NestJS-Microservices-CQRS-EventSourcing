import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RABBITMQ_CONFIG } from './app.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const config = configService.get(RABBITMQ_CONFIG);
  await app.connectMicroservice<MicroserviceOptions>(config);

  app.startAllMicroservices();
}
bootstrap();
