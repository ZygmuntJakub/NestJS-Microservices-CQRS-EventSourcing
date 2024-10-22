import { Controller } from '@nestjs/common';
import { ResultService } from './result.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { GET_RESULTS_PATTERN } from '../app.patterns';

@Controller()
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @MessagePattern(GET_RESULTS_PATTERN)
  findAll(@Payload() payload, @Ctx() context: RmqContext) {
    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();
    // channel.ack(originalMsg);
    return {
      msg: `Hello from result microservice. Poll id: ${payload.pollId}`,
    };
  }
}
