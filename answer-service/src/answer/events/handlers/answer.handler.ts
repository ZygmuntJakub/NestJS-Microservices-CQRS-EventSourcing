import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { AnswerEvent } from '../index';
import { ClientProxy } from '@nestjs/microservices';
import { POLL_SERVICE } from '../../../app.constants';
import { VALIDATE_ANSWER_PATTERN } from '../../../app.patterns';
import { timeout } from 'rxjs/operators';
import { response } from 'express';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@EventsHandler(AnswerEvent)
export class AnswerEventHandler implements IEventHandler<AnswerEvent> {
  constructor(@Inject(POLL_SERVICE) private clientProxy: ClientProxy) {}
  async handle(event: AnswerEvent) {
    const { pollId, answers } = event;
    try {
      Logger.log(`AnswerEvent => Start validate vote`);
      const response = await this.clientProxy
        .send(VALIDATE_ANSWER_PATTERN, { pollId, answers })
        .pipe(timeout(2000))
        .toPromise();
      Logger.log(`AnswerEvent => End with success validate vote`);
    } catch (err) {
      Logger.log(err);
      Logger.log(`AnswerEvent => End with error validate vote`);
    }
  }
}
