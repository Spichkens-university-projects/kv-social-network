import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ type: String, name: 'email', example: 'test@mail.ru' })
  @IsNotEmpty({ message: 'Поле "Email" не может быть пустым' })
  @IsEmail({}, { message: 'Неверный формат почты' })
  email: string;

  @ApiProperty({ type: String, name: 'password', example: '12345' })
  @Length(4, 16, { message: 'Длинна пароля: от 4 до 16 симоволов' })
  password: string;
}
