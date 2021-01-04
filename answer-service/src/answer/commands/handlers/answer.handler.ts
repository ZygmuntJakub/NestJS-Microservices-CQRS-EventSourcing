import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { AnswerCommand } from '../impl/answer.command';
import { AnswerEvent } from '../../events';

@CommandHandler(AnswerCommand)
export class AnswerCommandHandler implements ICommandHandler<AnswerCommand> {
  constructor(private readonly publisher: EventBus) {}
  async execute(command: AnswerCommand) {
    const { pollId, answers, userId } = command;
    Logger.log(`AnswerCommandHandler => ${JSON.stringify(command)}`);
    this.publisher.publish(new AnswerEvent(userId, pollId, answers));
    return 'OK';
  }
}
