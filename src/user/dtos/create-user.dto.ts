import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'Имя пользователя' })
  readonly name: string;

  @IsEmail()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Электронная почта пользователя',
  })
  readonly email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'password123',
    description: 'Пароль пользователя',
  })
  readonly password: string;
}
