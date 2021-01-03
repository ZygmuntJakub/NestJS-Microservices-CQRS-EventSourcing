import { Module, OnModuleInit } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands';
import { EventHandlers } from './events';
import { Sagas } from './sagas';

@Module({
  imports: [CqrsModule],
  controllers: [AnswerController],
  providers: [...CommandHandlers, ...EventHandlers, ...Sagas],
})
export class AnswerModule {}
