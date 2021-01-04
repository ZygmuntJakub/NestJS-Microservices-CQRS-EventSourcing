import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AUTH_SERVICE } from '../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';
import { AUTH_CHECK_USER_PATTERN } from '../app.patterns';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorators';

@Injectable()
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly client: ClientProxy,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    Logger.log(`Start request from ${req.ip}`);
    if (this.checkIsPublic(context)) return true;
    try {
      if (!req.headers['authorization']) return false;
      const res = await this.client
        .send(AUTH_CHECK_USER_PATTERN, {
          jwt: req.headers['authorization']?.split(' ')[1],
          roles: this.getRoles(context) ?? null,
        })
        .pipe(timeout(5000))
        .toPromise<boolean>();
      if (res) {
        this.saveCurrentUser(context, res);
        return true;
      }
      return false;
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }

  checkIsPublic(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  getRoles(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  saveCurrentUser(context: ExecutionContext, user) {
    const request = context.switchToHttp().getRequest();
    request.currentUser = user;
  }
}
