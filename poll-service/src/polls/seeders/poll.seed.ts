import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Poll } from '../entities/poll.entity';

export default class PollSeed implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    await factory(Poll)().create();
  }
}
