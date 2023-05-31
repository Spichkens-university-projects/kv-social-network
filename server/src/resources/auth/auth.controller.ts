import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from '../users/schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { LoginResponseType } from './types/login-response.type';
import { RefreshResponseType } from './types/refresh-response.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная регистрация пользователя',
    type: User,
  })
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный вход',
    type: User,
  })
  login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseType> {
    return this.authService.validateUserByPassword(loginUserDto);
  }

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Регенрация пары токенов' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная регенерация пары токенов',
  })
  async refresh(@Req() request): Promise<RefreshResponseType> {
    return this.authService.refresh(request.cookies['refresh']);
  }
}
