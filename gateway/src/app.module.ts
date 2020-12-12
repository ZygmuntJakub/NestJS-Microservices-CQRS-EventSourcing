import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SignInModule } from './sign-in/sign-in.module';
import configuration from './config/config';

@Module({
  imports: [
    SignInModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
})
export class AppModule {}
