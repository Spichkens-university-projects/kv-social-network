import { IsNotEmpty } from 'class-validator';
import { LoginUserDto } from './login-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends LoginUserDto {
  @ApiProperty({ type: String, name: 'name', example: 'Саша' })
  @IsNotEmpty({ message: 'Поле "Имя" не может быть пустым' })
  name: string;

  @ApiProperty({ type: String, name: 'surname', example: 'Спичка' })
  @IsNotEmpty({ message: 'Поле "Фамилия" не может быть пустым' })
  surname: string;

  @ApiProperty({ type: String, name: 'username', example: 'Spichkens' })
  @IsNotEmpty({ message: 'Поле "Имя пользователя" не может быть пустым' })
  username: string;
}
