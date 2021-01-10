import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role, User } from '../entities/user.entity';
import { ADMIN_ROLE, PARTICIPANT_ROLE } from '../../app.constants';

export default class UserSeed implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    const participant = await factory(Role)({
      name: PARTICIPANT_ROLE,
    }).create();
    const admin = await factory(Role)({ name: ADMIN_ROLE }).create();
    for (let i = 0; i < 10_000; i++) {
      await factory(User)({ username: `${PARTICIPANT_ROLE}-${i}` })
        .map(async (user: User) => {
          user.roles = [participant];
          return user;
        })
        .create();
    }
    await factory(User)()
      .map(async (user: User) => {
        user.roles = [admin];
        return user;
      })
      .create();
    await factory(User)({ username: 'admin' })
      .map(async (user: User) => {
        user.roles = [admin, participant];
        user.username = 'admin';
        return user;
      })
      .create();
  }
}
