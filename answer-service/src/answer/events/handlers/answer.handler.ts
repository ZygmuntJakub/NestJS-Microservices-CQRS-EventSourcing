import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { AnswerEvent } from '../index';

@EventsHandler(AnswerEvent)
export class AnswerEventHandler implements IEventHandler<AnswerEvent> {
  handle(event: AnswerEvent): any {
    Logger.log(`AnswerEvent => pollId: ${event.pollId}`);
  }
}
