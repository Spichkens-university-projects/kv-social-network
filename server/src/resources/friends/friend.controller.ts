import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IsObjectId } from '../../helpers/ValidateObjectId';
import { AuthRequired } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/schemas/user.schema';
import { FriendService } from './friend.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('friends')
@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @ApiBearerAuth('defaultBearerAuth')
  @Get('')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  @ApiOperation({ summary: 'Получить всех друзей' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список всех друзей',
    type: User,
    isArray: true,
  })
  getAllFriends(@CurrentUser('_id') currentUserId: string): Promise<User[]> {
    return this.friendService
      .getUser(currentUserId)
      .then((user) => user.friends);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Get('subscribers')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  @ApiOperation({ summary: 'Получить всех подписчиков' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список всех подписчиков',
    type: User,
    isArray: true,
  })
  getAllSubscribers(
    @CurrentUser('_id') currentUserId: string,
  ): Promise<User[]> {
    return this.friendService
      .getUser(currentUserId)
      .then((user) => user.subscribers);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Get('subscriptions')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  @ApiOperation({ summary: 'Получить все подписки' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список всех подписок',
    type: User,
    isArray: true,
  })
  getAllSubscriptions(
    @CurrentUser('_id') currentUserId: string,
  ): Promise<User[]> {
    return this.friendService
      .getUser(currentUserId)
      .then((user) => user.subscriptions);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Get('by-id/:otherId')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  @ApiOperation({ summary: 'Получить друга по идентификатору' })
  @ApiParam({
    name: 'otherId',
    required: true,
    description: 'Идентификатор другого пользователя',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь',
    type: User,
  })
  getFriendById(
    @CurrentUser('_id') currentUserId: string,
    @Param('otherId', IsObjectId) otherUserId: string,
  ): Promise<User> {
    return this.friendService.getFriendById(currentUserId, otherUserId);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Post('send/:otherId')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  @ApiOperation({ summary: 'Отправить запрос на дружбу' })
  @ApiParam({
    name: 'otherId',
    required: true,
    description: 'Идентификатор другого пользователя',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь, которому адресован запрос',
    type: User,
  })
  sendFriendRequest(
    @CurrentUser('_id') senderId: string,
    @Param('otherId', IsObjectId) otherUserId: string,
  ): Promise<User> {
    return this.friendService.sendFriendRequest(senderId, otherUserId);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Patch('accept/:otherId')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  @ApiOperation({ summary: 'Принять запрос на дружбу' })
  @ApiParam({
    name: 'otherId',
    required: true,
    description: 'Идентификатор другого пользователя',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь, которому адресован запрос',
    type: User,
  })
  acceptFriendRequest(
    @CurrentUser('_id') currentUserId: string,
    @Param('otherId', IsObjectId) otherUserId: string,
  ) {
    return this.friendService.acceptFriendRequest(currentUserId, otherUserId);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Patch('reject/:otherId')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  @ApiOperation({ summary: 'Отклонить запрос на дружбу' })
  @ApiParam({
    name: 'otherId',
    required: true,
    description: 'Идентификатор другого пользователя',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь, которому адресован запрос',
    type: User,
  })
  rejectFriendRequest(
    @CurrentUser('_id') currentUserId: string,
    @Param('otherId', IsObjectId) otherUserId: string,
  ) {
    return this.friendService.rejectFriendRequest(currentUserId, otherUserId);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Delete('remove/:otherId')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  @ApiOperation({ summary: 'Удалить друга' })
  @ApiParam({
    name: 'otherId',
    required: true,
    description: 'Идентификатор другого пользователя',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь, которому адресован запрос',
    type: User,
  })
  removeFriend(
    @CurrentUser('_id') currentUserId: string,
    @Param('otherId', IsObjectId) otherUserId: string,
  ) {
    return this.friendService.removeFriend(currentUserId, otherUserId);
  }
}
