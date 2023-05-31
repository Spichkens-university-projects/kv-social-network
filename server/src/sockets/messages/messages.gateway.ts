import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { Logger } from '@nestjs/common';
import { AddMessageResponse } from './messages.types';
import { IsObjectId } from '../../helpers/ValidateObjectId';
import { UpdateReadStatusDto } from './dto/update-read-status.dto';

@WebSocketGateway({
  cors: { origin: 'http://localhost:3000' },
  serveClient: true,
  namespace: '',
  transports: ['websocket'],
})
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer() server: Server;

  afterInit(server: any): any {
    return;
  }
  handleConnection(client: any, ...args: any[]): any {
    Logger.log(`${client.id} connected`);
  }
  handleDisconnect(client: any): any {
    Logger.log(`${client.id} disconnected`);
  }

  @SubscribeMessage('chat:user-joined')
  async joinDialog(
    @ConnectedSocket() client,
    @MessageBody('chatId') chatId: string,
  ) {
    client.join(chatId);
  }

  @SubscribeMessage('chat:user-leave')
  async leaveDialog(
    @ConnectedSocket() client,
    @MessageBody('chatId', IsObjectId) chatId: string,
  ) {
    client.leave(chatId);
  }

  @SubscribeMessage('chat:user-start-typing')
  async sendTypingStatus(
    @MessageBody() typingStatus: { chatId: string; userId: string },
  ) {
    const typingUser = await this.messagesService.getSender(
      typingStatus.userId,
    );
    const chatWhereTyping = await this.messagesService.getChat(
      typingStatus.chatId,
    );
    this.server.emit('chat:get-typing-user', { typingUser, chatWhereTyping });
  }

  @SubscribeMessage('chat:user-stop-typing')
  async removeTypingStatus(
    @MessageBody() typingStatus: { chatId: string; userId: string },
  ) {
    const typingUser = await this.messagesService.getSender(
      typingStatus.userId,
    );
    const chatWhereTyping = await this.messagesService.getChat(
      typingStatus.chatId,
    );

    this.server.emit('chat:get-stopped-typing-user', {
      typingUser,
      chatWhereTyping,
    });
  }

  @SubscribeMessage('message:update-read-status')
  async updateReadStatus(@MessageBody() updateMessageDto: UpdateReadStatusDto) {
    await this.messagesService.updateReadStatus(updateMessageDto);
    this.server.emit('message:read-status-updated', updateMessageDto);
  }

  @SubscribeMessage('message:send-to-server')
  async sendMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const addMessageResponse = await this.messagesService.createMessage(
      createMessageDto,
    );
    this.server
      .to(createMessageDto.chatId)
      .emit('message:send-to-client', addMessageResponse);
    await this.updateLastMessage(addMessageResponse);
  }

  async updateLastMessage(addMessageResponse: AddMessageResponse) {
    this.server.emit('chat:update-last-message', addMessageResponse);
  }
}
