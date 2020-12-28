import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { ClientProxy } from '@nestjs/microservices';
import { POLL_SERVICE } from '../app.constants';
import { GET_POLLS_PATTERN } from '../app.patterns';

@Controller('poll')
export class PollController {
  constructor(@Inject(POLL_SERVICE) private clientProxy: ClientProxy) {}

  @Post()
  create(@Body() createPollDto: CreatePollDto) {
    return null;
  }

  @Get()
  findAll() {
    return this.clientProxy.send(GET_POLLS_PATTERN, { msg: 'Hi' });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return null;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePollDto: UpdatePollDto) {
    return null;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return null;
  }
}
