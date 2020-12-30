import { Module } from '@nestjs/common';
import { ResultController } from './result.controller';
import { RESULT_SERVICE } from '../app.constants';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  controllers: [ResultController],
  providers: [
    {
      provide: RESULT_SERVICE,
      useFactory: (configService: ConfigService) => {
        const config = configService.get(RESULT_SERVICE);

        return ClientProxyFactory.create(config);
      },
      inject: [ConfigService],
    },
  ],
})
export class ResultModule {}
