import { Controller, Inject, Post } from '@nestjs/common';
import { ANSWER_SERVICE } from '../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from '../decorators/public.decorators';
import { SEND_ANSWER_PATTERN } from '../app.patterns';

@Controller('answer')
export class AnswerController {
  constructor(@Inject(ANSWER_SERVICE) private clientProxy: ClientProxy) {}

  @Post()
  @Public()
  sendAnswer() {
    return this.clientProxy.send(SEND_ANSWER_PATTERN, { msg: 'Hi' });
  }
}
