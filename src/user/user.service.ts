import { Injectable, NotFoundException } from '@nestjs/common';
import { userModel } from './user.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const user = await userModel.create({
      data: createUserDto,
    });
    return user;
  }

  async findAll() {
    return userModel.findMany();
  }

  async findOne(id: number) {
    const user = await userModel.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await userModel.update({
      where: { id },
      data: updateUserDto,
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await userModel.delete({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
