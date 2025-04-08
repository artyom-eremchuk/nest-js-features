import {
  Controller,
  Post,
  Request,
  Response,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно вошел в систему',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Выход пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно вышел из системы. Сессия была очищена.',
  })
  @ApiResponse({
    status: 204,
    description:
      'Сессия уже была пустая или не существовала. Выход завершён без данных.',
  })
  @Post('logout')
  async logout(@Request() req, @Response() res) {
    if (req.session && req.session.passport) {
      req.logout();

      return res
        .status(200)
        .json({ message: 'Пользователь успешно вышел из системы' });
    }

    return res.sendStatus(204);
  }
}
