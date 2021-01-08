import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RpcException } from '@nestjs/microservices';
import { ExistingAnswersDto } from '../../dist/result/dto/existing-answers.dto';
import { IncomingAnswerDto } from './dto/incoming-answer.dto';

@Injectable()
export class ResultService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
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
    const denormalizedAnswers = answers.map(({ questionId, answerId }) => ({
      questionId,
      answers: {
        [answerId]: 1,
      },
    }));
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
    existingAnswers.forEach(({ questionId, answers }) => {
      incomingAnswers.forEach(
        ({ questionId: incomingQuestionId, answerId }) => {
          if (incomingQuestionId === questionId) {
            answers[answerId] = answers[answerId] ? answers[answerId] + 1 : 1;
          }
        },
      );
    });
    Logger.log(
      `ResultService => Answers updated ${pollId}, ${existingAnswers}`,
    );
    await this.cacheManager.set(pollId, existingAnswers, { ttl: 99999999 });
  }

  async getResult(pollId) {
    return await this.cacheManager.get(pollId);
  }
}
