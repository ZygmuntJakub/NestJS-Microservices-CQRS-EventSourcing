import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveAnswerEvent } from '../impl/save-answer.event';
import { SaveAnswerErrorEvent } from '../impl/save-answer-error.event';
import { Answer } from '../../entities/answer.entity';
import { SaveAnswerSuccessEvent } from '../impl/save-answer-success.event';

@EventsHandler(SaveAnswerEvent)
export class SaveAnswerHandler implements IEventHandler<SaveAnswerEvent> {
  constructor(private readonly publisher: EventBus) {}
  async handle(event: SaveAnswerEvent) {
    const { userId, pollId, answers, retryCounter } = event;
    try {
      Logger.log(`SaveAnswerEvent => Start save vote ${JSON.stringify(event)}`);
      const answer = new Answer();
      answer.pollId = pollId;
      answer.userId = userId;
      answer.answers = answers;
      await Answer.save(answer);
      Logger.log(
        `SaveAnswerEvent => End with success save vote ${JSON.stringify(
          event,
        )}`,
      );
      this.publisher.publish(new SaveAnswerSuccessEvent(pollId, answers));
    } catch (err) {
      Logger.log(
        `SaveAnswerEvent => End with error save vote ${JSON.stringify(event)}`,
      );
      this.publisher.publish(
        new SaveAnswerErrorEvent(
          userId,
          pollId,
          answers,
          retryCounter,
          err.code,
        ),
      );
    }
  }
}
