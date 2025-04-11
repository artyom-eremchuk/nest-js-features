import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findByName(username);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }

    return null;
  }

  async validateUserById(id: number): Promise<Partial<User> | null> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  private generateToken(
    user: Partial<User>,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    const payload = { sub: user.id, name: user.name };

    return jwt.sign(payload, secret, { expiresIn });
  }

  async generateAccessToken(user: Partial<User>): Promise<string> {
    return this.generateToken(user, process.env.JWT_ACCESS_SECRET, '1h');
  }

  async generateRefreshToken(user: Partial<User>): Promise<string> {
    return this.generateToken(user, process.env.JWT_REFRESH_SECRET, '7d');
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await this.validateUserById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      const accessToken = await this.generateAccessToken(user);
      const newRefreshToken = await this.generateRefreshToken(user);

      return {
        access_token: accessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Недействительный refresh токен');
    }
  }
}
