import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ExistingAnswersDto } from '../../dist/result/dto/existing-answers.dto';
import { IncomingAnswerDto } from './dto/incoming-answer.dto';
import { ANSWER_SERVICE } from '../app.constants';
import { ANSWER_POLL_PROJECTION_PATTERN } from '../app.patterns';

@Injectable()
export class ResultService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(ANSWER_SERVICE) private clientProxy: ClientProxy,
  ) {}
  async receiveAnswer(pollId, answers) {
    try {
      Logger.log(
        `ResultService => Start save answer ${pollId}, ${JSON.stringify(
          answers,
        )}`,
      );
      const res = await this.cacheManager.get(pollId);
      if (!res) await this.saveAnswers(pollId, answers);
      else await this.updateAnswers(res, answers, pollId);
    } catch (err) {
      throw new RpcException('Error with cache data');
    }
  }

  async saveAnswers(pollId, answers) {
    const denormalizedAnswers = {};
    answers.forEach(({ questionId, answerId }) => {
      denormalizedAnswers[questionId] = { [answerId]: 1 };
    });
    console.log(denormalizedAnswers);
    await this.cacheManager.set(pollId, denormalizedAnswers, { ttl: 99999999 });
    Logger.log(
      `ResultService => New answers saved ${pollId}, ${JSON.stringify(
        answers,
      )}`,
    );
  }

  async updateAnswers(
    existingAnswers: ExistingAnswersDto[],
    incomingAnswers: IncomingAnswerDto[],
    pollId,
  ) {
    Logger.log(existingAnswers);
    Logger.log(incomingAnswers);
    incomingAnswers.forEach(({ questionId, answerId }) => {
      if (existingAnswers[questionId]) {
        existingAnswers[questionId][answerId] = existingAnswers[questionId][
          answerId
        ]
          ? existingAnswers[questionId][answerId] + 1
          : 1;
      } else {
        existingAnswers[questionId] = {};
        existingAnswers[questionId][answerId] = 1;
      }
    });
    Logger.log(
      `ResultService => Answers updated ${pollId}, ${existingAnswers}`,
    );
    await this.cacheManager.set(pollId, existingAnswers, { ttl: 99999999 });
  }

  async getResult(pollId) {
    return await this.cacheManager.get(pollId);
  }

  async pollProjection(pollId) {
    await this.cacheManager.reset();
    const answers = await this.clientProxy
      .send(ANSWER_POLL_PROJECTION_PATTERN, {
        pollId,
      })
      .toPromise();
    if (answers)
      return await this.cacheManager.set(pollId, answers, { ttl: 99999999 });
    throw new RpcException('PROJECTION_ERROR');
  }
}
