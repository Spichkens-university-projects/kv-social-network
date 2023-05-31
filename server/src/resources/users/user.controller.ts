import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { IsObjectId } from '../../helpers/ValidateObjectId';
import { AuthRequired } from '../auth/decorators/auth.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary:
      'Получить список всех пользователей по опциональными параметрам фильтрации',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Страница для пагинации',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Ограничитель кол-ва получаемых пользователей',
  })
  @ApiQuery({
    name: 'searchTerm',
    required: false,
    type: String,
    description: 'Фильтр для поиска по RegExp',
  })
  @ApiOkResponse({ status: HttpStatus.OK, type: User })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(
    @Query('excludeId', IsObjectId) excludeUserId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('searchTerm') searchTerm?: string,
  ): Promise<User[]> {
    return this.userService.getAll(page, limit, searchTerm, excludeUserId);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({
    summary: 'Получить текущего пользователя по Bearer <JWT>',
  })
  @Get('current')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  getCurrentUser(@CurrentUser('_id') currentUserId: string): Promise<User> {
    return this.userService.getCurrentUser(currentUserId);
  }

  @ApiOperation({
    summary: 'Получить пользователя по id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID пользователя',
    example: '644a7aa801f21d93fc7a063c',
  })
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', IsObjectId) id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @ApiOperation({
    summary: 'Получить пользователя по username',
    description:
      'Нужно для генерации статических страниц, доступ к которым можно получить по username пользователя',
  })
  @ApiParam({
    name: 'username',
    required: true,
    type: String,
    description: 'Username пользователя',
    example: '@Spichkens',
  })
  @Get('by-username/:username')
  @HttpCode(HttpStatus.OK)
  getByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({
    summary: 'Обновление информации о пользователе',
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  updateUser(
    @CurrentUser('_id') currentUserId: string,
    @Body() updateUserDto?: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(updateUserDto, currentUserId);
  }

  @Patch('add-photo')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  addPhoto(
    @CurrentUser('_id') currentUserId: string,
    @Body('photo') photo: string,
  ): Promise<User> {
    return this.userService.addPhoto(photo, currentUserId);
  }
}
