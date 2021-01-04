import { Injectable } from '@nestjs/common';
import { Invitation } from './entities/invitation.entity';
import { Option } from './entities/option.entity';
import { Question } from './entities/question.entity';
import { Poll } from './entities/poll.entity';
import { RpcException } from '@nestjs/microservices';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Injectable()
export class PollsService {
  async create(createPollDto) {
    try {
      const { title, invitations, questions } = createPollDto;
      const pollInvitations = invitations.map(
        ({ userId }) => new Invitation(userId),
      );
      const pollQuestions = questions.map(({ content, options }) => {
        const questionsOptions = options.map(
          ({ content }) => new Option(content),
        );
        const pollQuestion = new Question(content);
        pollQuestion.options = questionsOptions;
        return pollQuestion;
      });
      const poll = new Poll(title);
      poll.invitations = pollInvitations;
      poll.questions = pollQuestions;

      return await poll.save();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  findAll() {
    return Poll.find();
  }

  async validate(pollId, answers) {
    try {
      const { questions } = await Poll.findOneOrFail({ id: pollId });
      answers.forEach(({ questionId, answerId }) => {
        const question = questions.find(({ id }) => id == questionId);
        if (!question)
          throw new EntityNotFoundError(Question, { id: questionId });
        const option = question.options.find(({ id }) => id == answerId);
        if (!option) throw new EntityNotFoundError(Option, { id: answerId });
      });
    } catch (err) {
      console.log(err);
      throw new RpcException(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} poll`;
  }

  update(id: number, updatePollDto) {
    return `This action updates a #${id} poll`;
  }

  remove(id: number) {
    return `This action removes a #${id} poll`;
  }
}
