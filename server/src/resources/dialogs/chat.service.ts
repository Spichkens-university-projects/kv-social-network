import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Model } from 'mongoose';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { CreatePublicChatDto } from './dto/create-public-chat.dto';
import { ChatHelpers } from './chat.helpers';
import { UserService } from '../users/user.service';
import { GetHistoryParams } from './types/get-history.interface';
import { Message } from '../../sockets/messages/schemas/message.schema';
import { USER_EXCLUDING_FIELDS } from '../../config/populate.config';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: Model<ChatDocument>,
    private readonly chatHelpers: ChatHelpers,
    private readonly userService: UserService,
  ) {}

  // ДЛЯ ТЕСТА---------------------------------------

  async removeAllDialogs() {
    const dialogs = await this.chatModel.find().exec();
    await this.chatModel.deleteMany({});
    return;
  }

  // -----------------------------------------------------------

  async createDialog(createDialogDto: CreateDialogDto): Promise<Chat> {
    const existingDialog = await this.chatHelpers.findExistingDialog(
      createDialogDto.user1,
      createDialogDto.user2,
    );

    if (existingDialog) {
      this.chatHelpers.makeCurrentUserAsUser1(
        existingDialog,
        createDialogDto.user1,
      );
      return existingDialog;
    }

    const withUser = await this.userService.findById(createDialogDto.user2);

    const newDialog = await this.chatModel.create({
      ...createDialogDto,
      title: `${withUser.name} ${withUser.surname}`,
    });
    await newDialog.save();
    return newDialog.populate('user2');
  }

  async createGroup(createPublicDto: CreatePublicChatDto): Promise<Chat> {
    const userNames = createPublicDto.users.map((userId) =>
      this.userService.findById(userId).then((res) => res.name),
    );
    const newPublic = await this.chatModel.create({
      ...createPublicDto,
      title: userNames.join(', '),
    });
    await newPublic.save();
    return newPublic.populate('users admins');
  }

  async getChats(currentUserId: string): Promise<Chat[]> {
    let userDialogs = await this.chatHelpers.getCurrentUserDialogs(
      currentUserId,
    );
    userDialogs = userDialogs.map((dialog) =>
      this.chatHelpers.makeCurrentUserAsUser1(dialog, currentUserId),
    );

    const userGroups = await this.chatHelpers.getCurrentUserGroups(
      currentUserId,
    );

    return [...userDialogs, ...userGroups];
  }

  async getChatById(chatId: string) {
    return await this.chatModel.findById(chatId).exec();
  }

  async getHistory({
    page,
    chatId,
    limit,
  }: GetHistoryParams): Promise<Message[]> {
    let skip;
    if (page && limit) {
      skip = (page - 1) * limit;
    }

    return await this.chatModel
      .findById(chatId)
      .select('messages -_id')
      .populate({
        options: { sort: { createdAt: 'desc' }, skip, limit },
        path: 'messages',
        populate: { path: 'sender', select: USER_EXCLUDING_FIELDS },
      })
      .then((history) => history.messages);
  }
}
