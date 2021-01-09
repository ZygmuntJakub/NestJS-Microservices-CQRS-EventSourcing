import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PollsService } from './polls.service';
import {
  GET_POLLS_PATTERN,
  CREATE_POLL_PATTERN,
  VALIDATE_ANSWER_PATTERN,
  GET_POLL_PATTERN,
} from '../app.patterns';

@Controller()
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @MessagePattern(CREATE_POLL_PATTERN)
  create(@Payload() createPollDto) {
    return this.pollsService.create(createPollDto);
  }

  @MessagePattern(GET_POLLS_PATTERN)
  findAll(@Payload() payload, @Ctx() context: RmqContext) {
    return this.pollsService.findAll();
  }

  @MessagePattern(VALIDATE_ANSWER_PATTERN)
  validate(@Payload() payload, @Ctx() context: RmqContext) {
    const { userId, pollId, answers } = payload;
    return this.pollsService.validate(userId, pollId, answers);
  }

  @MessagePattern(GET_POLL_PATTERN)
  findOne(@Payload() payload) {
    const { id } = payload;
    return this.pollsService.findOne(id);
  }

  @MessagePattern('updatePoll')
  update(@Payload() updatePollDto) {
    return this.pollsService.update(updatePollDto.id, updatePollDto);
  }

  @MessagePattern('removePoll')
  remove(@Payload() id: number) {
    return this.pollsService.remove(id);
  }
}
