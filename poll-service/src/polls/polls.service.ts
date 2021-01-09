import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Invitation } from './entities/invitation.entity';
import { Option } from './entities/option.entity';
import { Question } from './entities/question.entity';
import { Poll } from './entities/poll.entity';
import { RpcException } from '@nestjs/microservices';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

function mapAsync<T1, T2>(
  array: T1[],
  callback: (value: T1, index: number, array: T1[]) => Promise<T2>,
): Promise<T2[]> {
  return Promise.all(array.map(callback));
}

async function filterAsync<T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T[]> {
  const filterMap = await mapAsync(array, callback);
  return array.filter((_, index) => filterMap[index]);
}

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

  async validate(userId, pollId, answers) {
    try {
      const { questions, invitations, published } = await Poll.findOneOrFail({
        id: pollId,
      });
      if (!published)
        throw new ForbiddenException({ message: 'POLL_NOT_PUBLISHED' });
      answers.forEach(({ questionId, answerId }) => {
        const question = questions.find(({ id }) => id == questionId);
        if (!question)
          throw new EntityNotFoundError(Question, { id: questionId });
        const option = question.options.find(({ id }) => id == answerId);
        if (!option) throw new EntityNotFoundError(Option, { id: answerId });
      });
      const invitationExists = invitations.some(
        ({ userId: invitationUserId }) => `${userId}` === invitationUserId,
      );
      if (!invitationExists)
        throw new EntityNotFoundError(Invitation, { userId });
    } catch (err) {
      Logger.log(err);
      throw new RpcException(err);
    }
  }

  async findOne(id: string) {
    try {
      return await Poll.findOneOrFail({
        id,
      });
    } catch (err) {
      Logger.log(err);
      throw new RpcException(err);
    }
  }

  async update(id: string, updatePollDto) {
    const poll = await Poll.findOneOrFail({
      id,
    });
    const target = {
      ...poll,
      ...updatePollDto,
      invitations: [...poll.invitations, ...(updatePollDto?.invitations ?? [])],
    };
    try {
      return Poll.save(target);
    } catch (err) {
      Logger.log(err);
      throw new RpcException(err);
    }
  }

  async remove(id: string) {
    try {
      const poll = await Poll.findOneOrFail({
        id,
      });
      if (poll?.published)
        throw new ForbiddenException({ message: 'POLL_PUBLISHED' });
      return Poll.delete({ id });
    } catch (err) {
      Logger.log(err);
      throw new RpcException(err);
    }
  }

  async checkInvitations(userId: string) {
    try {
      const invitations = await Invitation.find({ userId });
      return await filterAsync(invitations, async ({ pollId }) => {
        const poll = await Poll.findOneOrFail({ id: pollId });
        return poll.published;
      });
    } catch (err) {
      Logger.log(err);
      throw new RpcException(err);
    }
  }

  async getInvitationPoll(userId: string, pollId) {
    try {
      await Invitation.findOneOrFail({ userId, pollId });
      const poll = await Poll.findOneOrFail({ id: pollId });
      if (!poll?.published)
        throw new ForbiddenException({ message: 'POLL_NOT_PUBLISHED' });
      delete poll.invitations;
      return poll;
    } catch (err) {
      Logger.log(err);
      throw new RpcException(err);
    }
  }
}
