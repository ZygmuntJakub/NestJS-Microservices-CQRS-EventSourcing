import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { ANSWER_SERVICE } from '../app.constants';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  controllers: [AnswerController],
  providers: [
    {
      provide: ANSWER_SERVICE,
      useFactory: (configService: ConfigService) => {
        const config = configService.get(ANSWER_SERVICE);

        return ClientProxyFactory.create(config);
      },
      inject: [ConfigService],
    },
  ],
})
export class AnswerModule {}
