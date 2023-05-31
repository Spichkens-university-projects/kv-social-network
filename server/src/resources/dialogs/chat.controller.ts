import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthRequired } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Chat, ChatType } from './schemas/chat.schema';
import { IsObjectId } from '../../helpers/ValidateObjectId';
import { Message } from '../../sockets/messages/schemas/message.schema';

@ApiTags('chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // ДЛЯ ТЕСТА---------------------------------------

  @Delete('remove-all')
  removeAllDialogs() {
    return this.chatService.removeAllDialogs();
  }

  // -----------------------------------------------------------

  @Post('create-dialog')
  @AuthRequired()
  createDialog(
    @CurrentUser('_id', IsObjectId) currentUserId: string,
    @Query('withId', IsObjectId) withUserId: string,
  ): Promise<Chat> {
    return this.chatService.createDialog({
      user1: currentUserId,
      user2: withUserId,
      type: ChatType.DIALOG,
    });
  }

  @Post('create-public')
  @AuthRequired()
  createGroup(
    @CurrentUser('_id', IsObjectId) creator: string,
    @Body('users', IsObjectId) userIds?: string[],
  ): Promise<Chat> {
    return this.chatService.createGroup({
      type: ChatType.GROUP,
      admins: [creator],
      users: userIds,
    });
  }

  @Get()
  @AuthRequired()
  getChats(
    @CurrentUser('_id', IsObjectId) currentUserId: string,
  ): Promise<Chat[]> {
    return this.chatService.getChats(currentUserId);
  }

  @Get('by-id/:id')
  getChatById(@Param('id', IsObjectId) chatId: string): Promise<Chat> {
    return this.chatService.getChatById(chatId);
  }

  @Get('history')
  @AuthRequired()
  getHistory(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('chatId', IsObjectId) chatId: string,
  ): Promise<Message[]> {
    return this.chatService.getHistory({ chatId, page, limit });
  }
}
