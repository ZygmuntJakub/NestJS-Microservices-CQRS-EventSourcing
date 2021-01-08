import { Module, OnModuleInit } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands';
import { EventHandlers } from './events';
import { Sagas } from './sagas';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { POLL_SERVICE, RESULT_SERVICE } from '../app.constants';
import configuration from '../config/config';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AnswerController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    {
      provide: POLL_SERVICE,
      useFactory: (configService: ConfigService) => {
        const config = configService.get(POLL_SERVICE);

        return ClientProxyFactory.create(config);
      },
      inject: [ConfigService],
    },
    {
      provide: RESULT_SERVICE,
      useFactory: (configService: ConfigService) => {
        const config = configService.get(RESULT_SERVICE);

        return ClientProxyFactory.create(config);
      },
      inject: [ConfigService],
    },
  ],
})
export class AnswerModule {}
