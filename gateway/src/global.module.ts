import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PollModule } from './poll/poll.module';
import configuration from './config/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { AUTH_SERVICE } from './app.constants';
import { ClientProxyFactory } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    AuthModule,
    PollModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: AUTH_SERVICE,
      useFactory: (configService: ConfigService) => {
        const config = configService.get(AUTH_SERVICE);

        return ClientProxyFactory.create(config);
      },
      inject: [ConfigService],
    },
  ],
  exports: [AUTH_SERVICE],
})
export class GlobalModule {}
