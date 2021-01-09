import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';

@Module({
  controllers: [PollsController],
  providers: [PollsService],
})
export class PollsModule {}
