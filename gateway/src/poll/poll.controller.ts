import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { ClientProxy } from '@nestjs/microservices';
import { POLL_SERVICE } from '../app.constants';
import { CREATE_POLL_PATTERN, GET_POLLS_PATTERN } from '../app.patterns';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../enums/role.enum';
import { Public } from '../decorators/public.decorators';

@Controller('poll')
export class PollController {
  constructor(@Inject(POLL_SERVICE) private clientProxy: ClientProxy) {}

  @Post()
  @Public()
  // @Roles([Role.Admin])
  create(@Body() createPollDto: CreatePollDto) {
    return this.clientProxy.send(CREATE_POLL_PATTERN, { createPollDto });
  }

  @Get()
  @Roles([Role.Admin])
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
