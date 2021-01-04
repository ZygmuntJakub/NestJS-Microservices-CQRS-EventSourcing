import { Controller } from '@nestjs/common';
import { SEND_ANSWER_PATTERN } from '../app.patterns';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { AnswerCommand } from './commands';

@Controller()
export class AnswerController {
  constructor(private commandBus: CommandBus) {}

  @MessagePattern(SEND_ANSWER_PATTERN)
  async answer(@Payload() payload, @Ctx() context: RmqContext) {
    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();
    // channel.ack(originalMsg);
    const { userId, pollId, answers } = payload;
    return await this.commandBus.execute(
      new AnswerCommand(userId, pollId, answers),
    );
  }
}
