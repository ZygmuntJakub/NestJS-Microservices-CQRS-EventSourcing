import {
  Controller,
  Logger,
  Post,
  Req,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { AUTH_CHECK_USER_PATTERN, AUTH_USER_PATTERN } from '../app.patterns';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @MessagePattern(AUTH_USER_PATTERN)
  async login(req) {
    return this.authService.login(req.user);
  }

  @MessagePattern(AUTH_CHECK_USER_PATTERN)
  async check(data) {
    try {
      const { jwt, roles } = data ?? {};
      if (!jwt || !roles) return false;
      const decodedToken = this.authService.validateToken(jwt);
      return (
        decodedToken && this.authService.validateRoles(roles, decodedToken)
      );
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
