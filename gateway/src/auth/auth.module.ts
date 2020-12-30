import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { AUTH_SERVICE } from '../app.constants';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: AUTH_SERVICE,
      useFactory: (configService: ConfigService) => {
        const config = configService.get(AUTH_SERVICE);

        return ClientProxyFactory.create(config);
      },
      inject: [ConfigService],
    },
  ],
  imports: [],
  controllers: [AuthController],
})
export class AuthModule {}
