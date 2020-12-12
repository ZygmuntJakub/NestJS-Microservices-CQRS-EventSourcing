import { Controller } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';
import { LOGIN_PATTERN } from '../../app.patterns';

@Controller('sign-in')
export class SignInController {
  @MessagePattern(LOGIN_PATTERN)
  login(): Observable<string> {
    return of('Hi');
  }
}
