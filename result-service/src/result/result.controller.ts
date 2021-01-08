import { Controller } from '@nestjs/common';
import { ResultService } from './result.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { GET_RESULTS_PATTERN, SEND_RESULT_PATTERN } from '../app.patterns';

@Controller()
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @MessagePattern(SEND_RESULT_PATTERN)
  async receiveAnswer(@Payload() payload, @Ctx() context: RmqContext) {
    const { pollId, answers } = payload;
    await this.resultService.receiveAnswer(pollId, answers);
  }

  @MessagePattern(GET_RESULTS_PATTERN)
  async getResult(@Payload() payload, @Ctx() context: RmqContext) {
    const { pollId } = payload;
    return await this.resultService.getResult(pollId);
  }
}
