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
  UPDATE_POLL_PATTERN,
  DELETE_POLL_PATTERN,
  CHECK_INVITATIONS_PATTERN,
  GET_INVITATION_POLL_PATTERN,
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

  @MessagePattern(UPDATE_POLL_PATTERN)
  update(@Payload() payload) {
    const { updatePollDto, id } = payload;
    return this.pollsService.update(id, updatePollDto);
  }

  @MessagePattern(DELETE_POLL_PATTERN)
  remove(@Payload() payload) {
    const { id } = payload;
    return this.pollsService.remove(id);
  }

  @MessagePattern(CHECK_INVITATIONS_PATTERN)
  checkInvitations(@Payload() payload) {
    const { userId } = payload;
    return this.pollsService.checkInvitations(userId);
  }

  @MessagePattern(GET_INVITATION_POLL_PATTERN)
  getInvitationPoll(@Payload() payload) {
    const { userId, pollId } = payload;
    return this.pollsService.getInvitationPoll(userId, pollId);
  }
}
