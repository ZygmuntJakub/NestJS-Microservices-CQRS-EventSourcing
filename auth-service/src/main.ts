import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 8082,
        host: 'auth-service',
      },
    },
  );
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  console.log(`Starting AUTH service on ${port}`);
  await app.listen(port);
}
bootstrap();
