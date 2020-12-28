import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { POSTGRES_CONFIG } from './app.constants';
import UserSeed from './user/seeders/user.seed';
import { runSeeder, useRefreshDatabase, useSeeding } from 'typeorm-seeding';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 8081,
        host: 'user-service',
      },
    },
  );
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  console.log(`Starting USER service on ${port}`);
  await app.listen(port);
}
bootstrap();
