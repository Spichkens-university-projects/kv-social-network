import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { Model } from 'mongoose';
import { Chat } from '../../resources/dialogs/schemas/chat.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserService } from '../../resources/users/user.service';
import { USER_EXCLUDING_FIELDS } from '../../config/populate.config';
import { AddMessageResponse } from './messages.types';
import { UpdateReadStatusDto } from './dto/update-read-status.dto';
import { ChatService } from '../../resources/dialogs/chat.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Chat.name)
    private readonly chatModel: Model<Chat>,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}

  async getSender(senderId: string) {
    return await this.userService.findById(senderId);
  }

  async getChat(chatId: string) {
    return await this.chatService.getChatById(chatId);
  }

  async createMessage(
    createMessageDto: CreateMessageDto,
  ): Promise<AddMessageResponse> {
    const newMessage = await this.messageModel.create({
      ...createMessageDto,
      sender: createMessageDto.senderId,
    });

    const chat = await this.chatModel.findByIdAndUpdate(
      createMessageDto.chatId,
      { $push: { messages: newMessage } },
    );
    const updatedChat = await chat.save();

    return {
      chatId: createMessageDto.chatId,
      type: updatedChat.type,
      message: await newMessage.populate({
        path: 'sender',
        select: USER_EXCLUDING_FIELDS,
      }),
    };
  }

  async updateReadStatus(updateReadStatusDto: UpdateReadStatusDto) {
    const { messageId } = updateReadStatusDto;

    const message = await this.messageModel.findById(messageId);

    message.isRead = true;

    await message.save();

    return;
  }
}
