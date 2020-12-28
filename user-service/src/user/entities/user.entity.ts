import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, Min } from 'class-validator';
import { hash } from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  @Min(8)
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @ManyToMany((type) => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @CreateDateColumn()
  createdDate: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  name: string;
}
