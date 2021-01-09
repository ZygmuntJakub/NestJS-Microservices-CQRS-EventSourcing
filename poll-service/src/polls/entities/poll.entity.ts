import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Invitation } from './invitation.entity';

@Entity()
export class Poll extends BaseEntity {
  constructor(title: string) {
    super();
    this.title = title;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @OneToMany(() => Question, (question) => question.poll, {
    cascade: ['update', 'remove', 'insert'],
    eager: true,
  })
  questions: Question[];

  @OneToMany(() => Invitation, (invitation) => invitation.poll, {
    cascade: ['update', 'remove', 'insert'],
    eager: true,
  })
  invitations: Invitation[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
