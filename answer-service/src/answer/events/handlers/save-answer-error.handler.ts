import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveAnswerEvent } from '../impl/save-answer.event';
import { SaveAnswerErrorEvent } from '../impl/save-answer-error.event';
import { CompensationAnswerEvent } from '../impl/compensation-answer.event';
import { ANSWER_UNIQUE_VIOLATION } from '../../../app.constants';

@EventsHandler(SaveAnswerErrorEvent)
export class SaveAnswerErrorHandler
  implements IEventHandler<SaveAnswerErrorEvent> {
  constructor(private readonly publisher: EventBus) {}
  handle(event: SaveAnswerErrorEvent): any {
    const { userId, pollId, answers, retryCounter, errorCode } = event;
    if (retryCounter >= 2) {
      Logger.log(
        `SaveAnswerEventError => Dropping vote ${JSON.stringify(event)}`,
      );
      if (errorCode !== ANSWER_UNIQUE_VIOLATION)
        this.publisher.publish(new CompensationAnswerEvent(userId, pollId));
    } else {
      Logger.log(`SaveAnswerEventError => Retry vote ${JSON.stringify(event)}`);
      this.publisher.publish(
        new SaveAnswerEvent(userId, pollId, answers, retryCounter + 1),
      );
    }
  }
}
