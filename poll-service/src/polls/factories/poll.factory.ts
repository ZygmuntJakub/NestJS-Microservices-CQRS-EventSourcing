import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Context } from 'vm';
import { Poll } from '../entities/poll.entity';
import { Question } from '../entities/question.entity';
import { Invitation } from '../entities/invitation.entity';
import { Option } from '../entities/option.entity';

define(Poll, (faker: typeof Faker, context: Context) => {
  const question = new Question('Test Question');
  const firstOption = new Option('First answer');
  const secondOption = new Option('Second asnwer');
  question.options = [firstOption, secondOption];
  const invitation = new Invitation('1');
  const poll = new Poll('Test poll');
  poll.questions = [question];
  poll.invitations = [invitation];
  return poll;
});
