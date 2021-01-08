import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveAnswerEvent } from '../impl/save-answer.event';
import { RpcException } from '@nestjs/microservices';
import { SaveAnswerEventError } from '../impl/save-answer.event-error';

@EventsHandler(SaveAnswerEvent)
export class SaveAnswerHandler implements IEventHandler<SaveAnswerEvent> {
  constructor(private readonly publisher: EventBus) {}
  handle(event: SaveAnswerEvent): any {
    const { userId, pollId, answers, retryCounter } = event;
    try {
      Logger.log(`SaveAnswerEvent => Start save vote ${JSON.stringify(event)}`);
      throw 'error';
      Logger.log(
        `SaveAnswerEvent => End with success save vote ${JSON.stringify(
          event,
        )}`,
      );
    } catch (err) {
      Logger.log(
        `SaveAnswerEvent => End with error save vote ${JSON.stringify(event)}`,
      );
      this.publisher.publish(
        new SaveAnswerEventError(userId, pollId, answers, retryCounter),
      );
    }
  }
}
