import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindConditions } from 'typeorm';
@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    return User.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(query: FindConditions<User>): Promise<User> {
    return User.findOne(query);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
