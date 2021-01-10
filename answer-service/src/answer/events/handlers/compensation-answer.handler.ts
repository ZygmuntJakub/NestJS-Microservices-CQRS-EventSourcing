import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { CompensationAnswerEvent } from '../impl/compensation-answer.event';
import { RESTORE_INVITATION_PATTERN } from '../../../app.patterns';
import { timeout } from 'rxjs/operators';
import { POLL_SERVICE } from '../../../app.constants';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(CompensationAnswerEvent)
export class CompensationAnswerHandler
  implements IEventHandler<CompensationAnswerEvent> {
  constructor(
    @Inject(POLL_SERVICE) private clientProxy: ClientProxy,
    private readonly publisher: EventBus,
  ) {}
  async handle(event: CompensationAnswerEvent) {
    const { userId, pollId } = event;
    try {
      Logger.log(`SaveAnswerEvent => Start save vote ${JSON.stringify(event)}`);
      await this.clientProxy
        .send(RESTORE_INVITATION_PATTERN, { userId, pollId })
        .pipe(timeout(2000))
        .toPromise();
      Logger.log(
        `SaveAnswerEvent => End with success save vote ${JSON.stringify(
          event,
        )}`,
      );
    } catch (err) {
      Logger.log(
        `SaveAnswerEvent => End with error save vote ${JSON.stringify(event)}`,
      );
    }
  }
}
