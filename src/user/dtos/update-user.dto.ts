import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'Updated Name',
    description: 'Обновлённое имя пользователя',
  })
  readonly name?: string;

  @ApiProperty({
    example: 'updated.email@example.com',
    description: 'Обновлённая электронная почта пользователя',
  })
  readonly email?: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'Обновлённый пароль пользователя',
  })
  readonly password?: string;
}
