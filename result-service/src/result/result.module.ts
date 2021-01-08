import { CacheModule, Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';

@Module({
  imports: [CacheModule.register()],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
