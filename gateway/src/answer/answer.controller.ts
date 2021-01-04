import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { ANSWER_SERVICE } from '../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { SEND_ANSWER_PATTERN } from '../app.patterns';
import { AnswerDto } from './dto/answer.dto';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../enums/role.enum';
import { CurrentUser } from '../decorators/current-user.decorators';
import { timeout } from 'rxjs/operators';

@Controller('answer')
export class AnswerController {
  constructor(@Inject(ANSWER_SERVICE) private clientProxy: ClientProxy) {}

  @Post(':id')
  @Roles([Role.Admin, Role.Participant])
  sendAnswer(
    @CurrentUser() user,
    @Param('id') pollId: string,
    @Body() answerDto: AnswerDto,
  ) {
    answerDto.pollId = pollId;
    answerDto.userId = user.id;
    return this.clientProxy.send(SEND_ANSWER_PATTERN, { ...answerDto });
  }
}
