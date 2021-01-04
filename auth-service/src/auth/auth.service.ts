import {
  Inject,
  Injectable,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { USER_SERVICE } from '../app.constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { GET_USER_PATTERN } from '../app.patterns';
import { catchError, timeout } from 'rxjs/operators';
import { throwError, TimeoutError } from 'rxjs';
import { compareSync } from 'bcrypt';
import { Role } from '../enums/role.enums';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE) private readonly client: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.getUser(username);

      if (compareSync(password, user?.password)) return user;
      return null;
    } catch (e) {
      Logger.log(e);
      throw new RpcException('INVALID_CREDENTIALS');
    }
  }

  async login(user) {
    const payload = {
      user: {
        username: user.username,
      },
      sub: user.id,
    };

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  async validateRoles(roles: Role[], decodedToken) {
    try {
      const {
        user: { username },
      } = decodedToken;
      const user = await this.getUser(username);
      if (user.roles) {
        const userRoles = user.roles.map(({ name }) => name);
        return userRoles.some((role) => roles.includes(role)) ? user : false;
      }
      return false;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }

  async getUser(username) {
    try {
      return await this.client
        .send(GET_USER_PATTERN, { username })
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(new RequestTimeoutException());
            }
            return throwError(err);
          }),
        )
        .toPromise();
    } catch (e) {
      Logger.log(e);
      return null;
    }
  }
}
