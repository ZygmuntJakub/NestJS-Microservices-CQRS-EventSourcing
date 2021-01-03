import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveAnswerEvent } from '../impl/save-answer.event';

@EventsHandler(SaveAnswerEvent)
export class SaveAnswerHandler implements IEventHandler<SaveAnswerEvent> {
  handle(event: SaveAnswerEvent): any {
    Logger.log(`SaveAnswerEvent => pollId: ${event.pollId}`);
  }
}
