import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Poll } from './poll.entity';
import { Unique } from 'typeorm/browser';

@Entity()
export class Invitation extends BaseEntity {
  constructor(userId: string) {
    super();
    this.userId = userId;
  }

  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  pollId: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Poll, (poll) => poll.invitations, { onDelete: 'CASCADE' })
  poll: Poll;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
