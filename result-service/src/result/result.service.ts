import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ResultService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async receiveAnswer(pollId, answers) {
    try {
      const res = await this.cacheManager.get(pollId);
      if (!res) await this.saveAnswers(pollId, answers);
      else await this.updateAnswers(res, answers, pollId);
    } catch (err) {
      throw new RpcException('Error with cache data');
    }
    console.log(pollId, answers);
  }

  async saveAnswers(pollId, answers) {
    const denormalizedAnswers = answers.map(({ questionId, answerId }) => ({
      questionId,
      answers: {
        [answerId]: 1,
      },
    }));
    await this.cacheManager.set(pollId, denormalizedAnswers, { ttl: 99999999 });
  }

  async updateAnswers(existingAnswers: any, incomingAnswers: any, pollId) {
    const updatedAnswers = existingAnswers.map(({ questionId, answers }) => {
      incomingAnswers.forEach(
        ({ questionId: incomingQuestionId, answerId }) => {
          if (incomingQuestionId === questionId) {
            answers[answerId] = answers[answerId] ? answers[answerId] + 1 : 1;
          }
        },
      );
    });
    await this.cacheManager.set(pollId, updatedAnswers, { ttl: 99999999 });
  }

  async getResult(pollId) {
    return await this.cacheManager.get(pollId);
  }
}
