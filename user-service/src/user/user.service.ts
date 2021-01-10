import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from './entities/user.entity';
import { FindConditions } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { PARTICIPANT_ROLE } from '../app.constants';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    try {
      const user = User.create(createUserDto);
      const role = await Role.findOneOrFail({ name: PARTICIPANT_ROLE });
      user.roles = [role];
      return User.save(user);
    } catch (err) {
      Logger.log(err);
      throw new RpcException(err);
    }
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

  addUser(username, password, email) {}
}
