import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { AUTH_SERVICE } from '../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AUTH_USER_PATTERN } from '../app.patterns';
import { CommonExceptionFilter } from '../filters/rpc-exception.filter';
import { Public } from '../decorators/public.decorators';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private client: ClientProxy) {}

  @Post()
  @Public()
  @UseFilters(new CommonExceptionFilter())
  login(@Body() data: any): Observable<string> {
    return this.client.send<string>(AUTH_USER_PATTERN, { body: { ...data } });
  }
}
