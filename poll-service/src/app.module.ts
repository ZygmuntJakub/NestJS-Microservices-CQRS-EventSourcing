import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import configuration from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POSTGRES_CONFIG } from './app.constants';
import { PollsModule } from './polls/polls.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get(POSTGRES_CONFIG),
      inject: [ConfigService],
    }),
    PollsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
