import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';

@Module({
  controllers: [PollsController],
  providers: [PollsService],
})
export class PollsModule {}
