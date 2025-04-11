import { Controller, Post, Request, Body, UseGuards } from '@nestjs/common';
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
  @Post('register') // register
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя и получение токенов' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 201,
    description:
      'Пользователь успешно вошел в систему и получил access и refresh токены',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login') // login
  async login(@Request() req) {
    const user = req.user;

    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  @ApiOperation({ summary: 'Выход пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно вышел из системы. Сессия была очищена.',
  })
  @Post('logout') // logout
  async logout(@Request() req) {
    req.session.destroy();
    return { msg: 'Сессия пользователя завершена.' };
  }

  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiResponse({
    status: 200,
    description: 'Новые access_token и refresh_token успешно сгенерированы',
  })
  @Post('refresh-token') // refresh token
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
