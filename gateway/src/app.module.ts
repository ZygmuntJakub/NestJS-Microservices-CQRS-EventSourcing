import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PollModule } from './poll/poll.module';
import configuration from './config/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PollModule,
  ],
})
export class AppModule {}
