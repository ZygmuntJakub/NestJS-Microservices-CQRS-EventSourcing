import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { SaveAnswerEvent, ValidateAnswerEvent } from '../index';
import { ClientProxy } from '@nestjs/microservices';
import { POLL_SERVICE } from '../../../app.constants';
import { VALIDATE_ANSWER_PATTERN } from '../../../app.patterns';
import { timeout } from 'rxjs/operators';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@EventsHandler(ValidateAnswerEvent)
export class ValidateAnswerEventHandler
  implements IEventHandler<ValidateAnswerEvent> {
  constructor(
    @Inject(POLL_SERVICE) private clientProxy: ClientProxy,
    private readonly publisher: EventBus,
  ) {}
  async handle(event: ValidateAnswerEvent) {
    const { userId, pollId, answers } = event;
    try {
      Logger.log(`AnswerEvent => Start validate vote`);
      const response = await this.clientProxy
        .send(VALIDATE_ANSWER_PATTERN, { pollId, answers })
        .pipe(timeout(2000))
        .toPromise();
      Logger.log(`AnswerEvent => End with success validate vote`);
      this.publisher.publish(new SaveAnswerEvent(userId, pollId, answers));
    } catch (err) {
      Logger.log(err);
      Logger.log(`AnswerEvent => End with error validate vote`);
    }
  }
}
