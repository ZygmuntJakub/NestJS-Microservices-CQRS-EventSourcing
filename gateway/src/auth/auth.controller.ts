import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AUTH_SERVICE } from '../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AUTH_USER_PATTERN } from '../app.patterns';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private client: ClientProxy) {}

  @Post()
  login(@Body() data: any): Observable<string> {
    return this.client.send<string>(AUTH_USER_PATTERN, { body: { ...data } });
  }
}
