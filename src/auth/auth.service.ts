import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByName(username);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }
}
