import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PollsService } from './polls.service';
import { GET_POLLS_PATTERN, CREATE_POLL_PATTERN } from '../app.patterns';

@Controller()
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @MessagePattern(CREATE_POLL_PATTERN)
  create(@Payload() payload) {
    const { createPollDto } = payload;
    return this.pollsService.create(createPollDto);
  }

  @MessagePattern(GET_POLLS_PATTERN)
  findAll(@Payload() payload, @Ctx() context: RmqContext) {
    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();
    // channel.ack(originalMsg);
    return this.pollsService.findAll();
  }

  @MessagePattern('findOnePoll')
  findOne(@Payload() id: number) {
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
