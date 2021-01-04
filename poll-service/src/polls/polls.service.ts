import { Injectable } from '@nestjs/common';
import { Invitation } from './entities/invitation.entity';
import { Option } from './entities/option.entity';
import { Question } from './entities/question.entity';
import { Poll } from './entities/poll.entity';

@Injectable()
export class PollsService {
  async create(createPollDto) {
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
  }

  findAll() {
    return Poll.find();
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
