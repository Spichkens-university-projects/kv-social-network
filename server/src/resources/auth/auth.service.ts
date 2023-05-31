import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { User } from '../users/schemas/user.schema';
import { UserService } from '../users/user.service';
import { JwtPayloadType } from './types/jwt-payload.type';
import { LoginResponseType } from './types/login-response.type';
import { RefreshResponseType } from './types/refresh-response.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUserByPassword(
    loginUserDto: LoginUserDto,
  ): Promise<LoginResponseType> {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user)
      throw new NotFoundException('Пользователь с таким Email не найден');

    const isValidPassword = await compare(loginUserDto.password, user.password);
    if (!isValidPassword)
      throw new UnauthorizedException('Неверный логин или пароль');

    const [accessToken, refreshToken] = await this.createJwtPayload(user);

    return { accessToken, refreshToken, user };
  }

  async validateUserByJwt(payload: JwtPayloadType) {
    const user = await this.userService.findByEmail(payload.email);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async createJwtPayload(user: User): Promise<string[]> {
    const data: JwtPayloadType = {
      email: user.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(data, {
        secret: this.configService.get<string>('ACCESS_SECRET'),
        expiresIn: '2h',
      }),
      this.jwtService.signAsync(data, {
        secret: this.configService.get<string>('REFRESH_SECRET'),
        expiresIn: '1y',
      }),
    ]);
    return [accessToken, refreshToken];
  }

  async register(createUserDto: CreateUserDto) {
    const isEmailBusy = await this.userService.checkPropBusiness(
      createUserDto.email,
    );
    if (isEmailBusy) throw new BadRequestException('Введенный Email уже занят');

    const isUserNameBusy = await this.userService.checkPropBusiness(
      createUserDto.username,
    );

    if (isUserNameBusy)
      throw new BadRequestException('Имя пользователя уже занято уже занято');

    const salt = await genSalt(5);

    createUserDto.password = await hash(createUserDto.password, salt);

    return await this.userService.saveNewUser(createUserDto);
  }

  async refresh(refresh: string): Promise<RefreshResponseType> {
    if (!refresh)
      throw new UnauthorizedException('Пользователь не авторизирован');

    const jwtPayload: JwtPayloadType = await this.jwtService.verifyAsync(
      refresh,
      {
        secret: this.configService.get('REFRESH_SECRET'),
      },
    );

    const user = await this.userService.findByEmail(jwtPayload.email);

    if (!user)
      throw new NotFoundException('Пользователь с таким Email не найден');

    const [accessToken, refreshToken] = await this.createJwtPayload(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
