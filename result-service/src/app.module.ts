import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResultModule } from './result/result.module';

@Module({
  imports: [ResultModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
