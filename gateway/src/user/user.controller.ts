import { Body, Controller, Inject, Post } from '@nestjs/common';
import { USER_SERVICE } from '../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { USER_ADD_PATTERN } from '../app.patterns';
import { RegisterDto } from './dto/register.dto';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../enums/role.enum';

@Controller('user')
export class UserController {
  constructor(@Inject(USER_SERVICE) private client: ClientProxy) {}

  @Post()
  @Roles([Role.Admin])
  add(@Body() data: RegisterDto): Observable<string> {
    return this.client.send<string>(USER_ADD_PATTERN, data);
  }
}
