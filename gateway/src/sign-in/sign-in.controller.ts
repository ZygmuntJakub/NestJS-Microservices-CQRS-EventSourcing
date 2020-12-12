import { Controller, Get, Inject } from '@nestjs/common';
import { USER_SERVICE } from '../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { LOGIN_PATTERN } from '../app.patterns';

@Controller('users')
export class SignInController {
  constructor(@Inject(USER_SERVICE) private client: ClientProxy) {}

  @Get('/login')
  login(): Observable<string> {
    const data = { login: 'Kuba', password: 'Zet' };
    return this.client.send<string>(LOGIN_PATTERN, data);
  }
}
