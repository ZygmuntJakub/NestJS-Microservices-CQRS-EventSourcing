import { Module } from '@nestjs/common';
import { PollController } from './poll.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/config';
import { POLL_SERVICE } from '../app.constants';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [PollController],
  providers: [
    {
      provide: POLL_SERVICE,
      useFactory: (configService: ConfigService) => {
        const config = configService.get(POLL_SERVICE);

        return ClientProxyFactory.create(config);
      },
      inject: [ConfigService],
    },
  ],
})
export class PollModule {}
