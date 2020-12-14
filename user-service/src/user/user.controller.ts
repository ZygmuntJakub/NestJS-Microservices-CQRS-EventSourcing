import { Controller, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { GET_USER_PATTERN } from '../app.patterns';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(GET_USER_PATTERN)
  async findOne(data: any): Promise<User> {
    const user = this.userService.findOne({ username: data.username });
    return user;
  }
}
