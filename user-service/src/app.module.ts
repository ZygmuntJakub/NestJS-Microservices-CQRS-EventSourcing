import { Module } from '@nestjs/common';
import configuration from './config/config';
import { ConfigModule } from '@nestjs/config';
import { SignInController } from './sign-in/sign-in.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [SignInController],
  providers: [],
})
export class AppModule {}
