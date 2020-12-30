import { Controller } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { SEND_ANSWER_PATTERN } from '../app.patterns';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @MessagePattern(SEND_ANSWER_PATTERN)
  findAll(@Payload() payload, @Ctx() context: RmqContext) {
    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();
    // channel.ack(originalMsg);
    return { msg: 'Hello from answer microservice' };
  }
}
