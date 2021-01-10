import { Controller } from '@nestjs/common';
import {
  ANSWER_POLL_PROJECTION_PATTERN,
  SEND_ANSWER_PATTERN,
} from '../app.patterns';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { AnswerCommand } from './commands';
import { ProjectionCommand } from './commands/impl/projection.command';

@Controller()
export class AnswerController {
  constructor(private commandBus: CommandBus) {}

  @MessagePattern(SEND_ANSWER_PATTERN)
  async answer(@Payload() payload, @Ctx() context: RmqContext) {
    const { userId, pollId, answers } = payload;
    return await this.commandBus.execute(
      new AnswerCommand(userId, pollId, answers),
    );
  }

  @MessagePattern(ANSWER_POLL_PROJECTION_PATTERN)
  async projection(@Payload() payload, @Ctx() context: RmqContext) {
    const { pollId } = payload;
    console.log(pollId);
    return await this.commandBus.execute(new ProjectionCommand(pollId));
  }
}
