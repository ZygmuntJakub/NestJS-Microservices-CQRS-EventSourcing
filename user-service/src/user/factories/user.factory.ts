import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../entities/user.entity';

define(User, (faker: typeof Faker) => {
  const username = faker.internet.userName();
  const email = faker.internet.email();

  const user = new User();
  user.username = username;
  user.email = email;
  user.password = '1234';
  return user;
});
