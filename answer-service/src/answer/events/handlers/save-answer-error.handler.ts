import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveAnswerEvent } from '../impl/save-answer.event';
import { SaveAnswerEventError } from '../impl/save-answer.event-error';

@EventsHandler(SaveAnswerEventError)
export class SaveAnswerErrorHandler
  implements IEventHandler<SaveAnswerEventError> {
  constructor(private readonly publisher: EventBus) {}
  handle(event: SaveAnswerEventError): any {
    const { userId, pollId, answers, retryCounter } = event;
    if (retryCounter >= 2)
      Logger.log(
        `SaveAnswerEventError => Dropping vote ${JSON.stringify(event)}`,
      );
    else {
      Logger.log(`SaveAnswerEventError => Retry vote ${JSON.stringify(event)}`);
      this.publisher.publish(
        new SaveAnswerEvent(userId, pollId, answers, retryCounter + 1),
      );
    }
  }
}
