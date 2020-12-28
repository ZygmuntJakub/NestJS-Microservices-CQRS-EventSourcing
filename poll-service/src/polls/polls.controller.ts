import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { GET_POLLS_PATTERN } from '../app.patterns';

@Controller()
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @MessagePattern('createPoll')
  create(@Payload() createPollDto: CreatePollDto) {
    return this.pollsService.create(createPollDto);
  }

  @MessagePattern(GET_POLLS_PATTERN)
  findAll(@Payload() payload, @Ctx() context: RmqContext) {
    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();
    // channel.ack(originalMsg);
    return { msg: 'Hello from there' };
  }

  @MessagePattern('findOnePoll')
  findOne(@Payload() id: number) {
    return this.pollsService.findOne(id);
  }

  @MessagePattern('updatePoll')
  update(@Payload() updatePollDto: UpdatePollDto) {
    return this.pollsService.update(updatePollDto.id, updatePollDto);
  }

  @MessagePattern('removePoll')
  remove(@Payload() id: number) {
    return this.pollsService.remove(id);
  }
}
