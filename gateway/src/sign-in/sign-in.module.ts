import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { USER_SERVICE } from '../app.constants';
import { SignInController } from './sign-in.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/config';

@Module({
  providers: [
    {
      provide: USER_SERVICE,
      useFactory: (configService: ConfigService) => {
        const options = configService.get(USER_SERVICE);
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
  ],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [SignInController],
})
export class SignInModule {}
