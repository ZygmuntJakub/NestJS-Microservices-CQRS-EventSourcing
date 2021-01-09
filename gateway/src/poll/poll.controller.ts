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
import {
  CREATE_POLL_PATTERN,
  GET_POLL_PATTERN,
  GET_POLLS_PATTERN,
  UPDATE_POLL_PATTERN,
  DELETE_POLL_PATTERN,
} from '../app.patterns';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../enums/role.enum';

@Controller('poll')
export class PollController {
  constructor(@Inject(POLL_SERVICE) private clientProxy: ClientProxy) {}

  @Post()
  @Roles([Role.Admin])
  create(@Body() createPollDto: CreatePollDto) {
    return this.clientProxy.send(CREATE_POLL_PATTERN, createPollDto);
  }

  @Get()
  @Roles([Role.Admin])
  findAll() {
    return this.clientProxy.send(GET_POLLS_PATTERN, {});
  }

  @Get(':id')
  @Roles([Role.Admin])
  findOne(@Param('id') id: string) {
    return this.clientProxy.send(GET_POLL_PATTERN, { id });
  }

  @Put(':id')
  @Roles([Role.Admin])
  update(@Param('id') id: string, @Body() updatePollDto: UpdatePollDto) {
    return this.clientProxy.send(UPDATE_POLL_PATTERN, { id, updatePollDto });
  }

  @Delete(':id')
  @Roles([Role.Admin])
  remove(@Param('id') id: string) {
    return this.clientProxy.send(DELETE_POLL_PATTERN, { id });
  }
}
