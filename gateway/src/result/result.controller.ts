import { Controller, Get, Inject, Param } from '@nestjs/common';
import { RESULT_SERVICE } from '../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from '../decorators/public.decorators';
import { GET_RESULTS_PATTERN } from '../app.patterns';

@Controller('result')
export class ResultController {
  constructor(@Inject(RESULT_SERVICE) private clientProxy: ClientProxy) {}

  @Get(':id')
  @Public()
  sendAnswer(@Param('id') pollId: string) {
    return this.clientProxy.send(GET_RESULTS_PATTERN, { pollId });
  }
}
