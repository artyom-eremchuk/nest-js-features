import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    description: 'Имя пользователя для входа в систему.',
    required: true,
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    format: 'password',
    description: 'Пароль для входа в систему.',
    required: true,
    minLength: 6,
    example: 'P@ssw0rd',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
