import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PollModule } from './poll/poll.module';
import configuration from './config/config';
import { GlobalModule } from './global.module';
import { AnswerModule } from './answer/answer.module';
import { ResultModule } from './result/result.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GlobalModule,
    AuthModule,
    PollModule,
    UserModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AnswerModule,
    ResultModule,
  ],
  providers: [],
})
export class AppModule {}
