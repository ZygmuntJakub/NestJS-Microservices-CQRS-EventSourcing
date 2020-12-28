import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Role, User } from '../entities/user.entity';
import { Context } from 'vm';

define(User, (faker: typeof Faker) => {
  const username = faker.internet.userName();
  const email = faker.internet.email();

  const user = new User();
  user.username = username;
  user.email = email;
  user.password = '1234';
  return user;
});

define(Role, (faker: typeof Faker, context: Context) => {
  const name = context.name;
  const role = new Role();
  role.name = name;
  return role;
});
