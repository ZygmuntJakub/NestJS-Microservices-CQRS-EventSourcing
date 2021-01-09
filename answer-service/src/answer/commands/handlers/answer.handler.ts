import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ValidateAnswerEvent } from '../../events';
import { AnswerCommand } from '../impl/answer.command';

@CommandHandler(AnswerCommand)
export class AnswerCommandHandler implements ICommandHandler<AnswerCommand> {
  constructor(private readonly publisher: EventBus) {}
  async execute(command: AnswerCommand) {
    const { pollId, answers, userId } = command;
    Logger.log(`AnswerCommandHandler => ${JSON.stringify(command)}`);
    this.publisher.publish(new ValidateAnswerEvent(userId, pollId, answers));
    return 'CHECK_YOUR_VOTE';
  }
}
