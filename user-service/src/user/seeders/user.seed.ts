import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role, User } from '../entities/user.entity';

export default class UserSeed implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    const participant = await factory(Role)({ name: 'participant' }).create();
    const moderator = await factory(Role)({ name: 'moderator' }).create();
    const admin = await factory(Role)({ name: 'admin' }).create();
    await factory(User)()
      .map(async (user: User) => {
        user.roles = [participant];
        return user;
      })
      .create();
    await factory(User)()
      .map(async (user: User) => {
        user.roles = [moderator];
        return user;
      })
      .create();
    await factory(User)()
      .map(async (user: User) => {
        user.roles = [admin];
        return user;
      })
      .create();
    await factory(User)()
      .map(async (user: User) => {
        user.roles = [admin, moderator, participant];
        return user;
      })
      .create();
  }
}
