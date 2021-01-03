import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, OnModuleInit } from '@nestjs/common';
import configuration from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POSTGRES_CONFIG } from './app.constants';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    AnswerModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get(POSTGRES_CONFIG),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
