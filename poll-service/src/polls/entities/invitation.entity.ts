import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Poll } from './poll.entity';

@Entity()
export class Invitation extends BaseEntity {
  constructor(userId: string) {
    super();
    this.userId = userId;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Poll, (poll) => poll.invitations)
  poll: Poll;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
