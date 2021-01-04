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
import { Question } from './question.entity';

@Entity()
export class Option extends BaseEntity {
  constructor(content: string) {
    super();
    this.content = content;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  content: string;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
