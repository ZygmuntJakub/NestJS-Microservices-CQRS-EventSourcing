import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Poll } from './poll.entity';
import { Option } from './option.entity';

@Entity()
export class Question extends BaseEntity {
  constructor(content: string) {
    super();
    this.content = content;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  content: string;

  @OneToMany(() => Option, (option) => option.question, {
    cascade: ['update', 'remove', 'insert'],
    onDelete: 'CASCADE',
    eager: true,
  })
  options: Option[];

  @ManyToOne(() => Poll, (poll) => poll.questions, { onDelete: 'CASCADE' })
  poll: Poll;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
