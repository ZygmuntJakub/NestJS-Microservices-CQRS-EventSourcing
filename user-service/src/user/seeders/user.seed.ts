import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../entities/user.entity';

export default class UserSeed implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    await factory(User)().createMany(10);
  }
}
