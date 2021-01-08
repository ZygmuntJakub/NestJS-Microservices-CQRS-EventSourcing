import { CacheModule, Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/config';
import { POSTGRES_CONFIG, REDIS_CONFIG } from '../app.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get(REDIS_CONFIG),
      inject: [ConfigService],
    }),
  ],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
