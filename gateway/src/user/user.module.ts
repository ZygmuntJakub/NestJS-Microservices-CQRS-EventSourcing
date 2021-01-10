import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';
import { USER_SERVICE } from '../app.constants';

@Module({
  providers: [
    {
      provide: USER_SERVICE,
      useFactory: (configService: ConfigService) => {
        const config = configService.get(USER_SERVICE);

        return ClientProxyFactory.create(config);
      },
      inject: [ConfigService],
    },
  ],
  imports: [],
  controllers: [UserController],
})
export class UserModule {}
