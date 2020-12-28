import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PollModule } from './poll/poll.module';
import configuration from './config/config';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    GlobalModule,
    AuthModule,
    PollModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [],
})
export class AppModule {}
