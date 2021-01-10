import { CacheModule, Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/config';
import { REDIS_CONFIG, ANSWER_SERVICE } from '../app.constants';
import { ClientProxyFactory } from '@nestjs/microservices';

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
  providers: [
    ResultService,
    {
      provide: ANSWER_SERVICE,
      useFactory: (configService: ConfigService) => {
        const config = configService.get(ANSWER_SERVICE);

        return ClientProxyFactory.create(config);
      },
      inject: [ConfigService],
    },
  ],
})
export class ResultModule {}
