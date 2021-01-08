import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { SaveAnswerEvent, ValidateAnswerEvent } from '../index';
import { ClientProxy } from '@nestjs/microservices';
import { POLL_SERVICE, RESULT_SERVICE } from '../../../app.constants';
import {
  SEND_RESULT_PATTERN,
  VALIDATE_ANSWER_PATTERN,
} from '../../../app.patterns';
import { timeout } from 'rxjs/operators';
import { SaveAnswerSuccessEvent } from '../impl/save-answer-success.event';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@EventsHandler(SaveAnswerSuccessEvent)
export class SaveAnswerSuccessEventHandler
  implements IEventHandler<ValidateAnswerEvent> {
  constructor(
    @Inject(RESULT_SERVICE) private clientProxy: ClientProxy,
    private readonly publisher: EventBus,
  ) {}
  async handle(event: SaveAnswerSuccessEvent) {
    const { pollId, answers } = event;
    try {
      Logger.log(
        `SaveAnswerSuccessEvent => Start send result ${JSON.stringify(event)}`,
      );
      await this.clientProxy
        .send(SEND_RESULT_PATTERN, { pollId, answers })
        .pipe(timeout(2000))
        .toPromise();
      Logger.log(
        `SaveAnswerSuccessEvent => End with success send result ${JSON.stringify(
          event,
        )}`,
      );
    } catch (err) {
      Logger.log(err);
      Logger.log(
        `AnswerEvent => End with error send result ${JSON.stringify(event)}`,
      );
    }
  }
}
