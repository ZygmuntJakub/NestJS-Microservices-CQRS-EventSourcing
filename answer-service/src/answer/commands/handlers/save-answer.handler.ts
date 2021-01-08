import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveAnswerEvent } from '../../events';
import { SaveAnswerCommand } from '../index';

@CommandHandler(SaveAnswerCommand)
export class SaveAnswerCommandHandler
  implements ICommandHandler<SaveAnswerCommand> {
  constructor(private readonly publisher: EventBus) {}
  async execute(command: SaveAnswerCommand) {
    const { userId, pollId, answers } = command;
    Logger.log(`SaveAnswerCommandHandler => pollId: ${pollId} `);
    this.publisher.publish(new SaveAnswerEvent(userId, pollId, answers));
    return 'OK';
  }
}
