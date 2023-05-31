import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Model } from 'mongoose';
import { USER_EXCLUDING_FIELDS } from '../../config/populate.config';

export class ChatHelpers {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: Model<ChatDocument>,
  ) {}

  async getCurrentUserDialogs(currentUserId: string): Promise<Chat[]> {
    return await this.chatModel
      .find({
        $or: [
          {
            user1: currentUserId,
          },
          {
            user2: currentUserId,
          },
        ],
      })
      .populate({ path: 'user1', select: USER_EXCLUDING_FIELDS })
      .populate({ path: 'user2', select: USER_EXCLUDING_FIELDS })
      .populate({
        options: { sort: { createdAt: -1 }, limit: 1 },
        path: 'messages',
        populate: {
          path: 'sender',
          select: USER_EXCLUDING_FIELDS,
        },
      })
      .select('-admins -users')
      .exec();
  }

  async getCurrentUserGroups(currentUserId: string): Promise<Chat[]> {
    return await this.chatModel
      .find({
        $or: [
          {
            users: currentUserId,
          },
          {
            admins: currentUserId,
          },
        ],
      })
      .lean(false)
      .populate({ path: 'users', select: USER_EXCLUDING_FIELDS })
      .populate({ path: 'admins', select: USER_EXCLUDING_FIELDS })
      .select('-user1 -user2 -messages')
      .exec();
  }

  async findExistingDialog(
    currentUserId: string,
    otherUserId: string,
  ): Promise<Chat> {
    return await this.chatModel
      .findOne({
        $or: [
          {
            user1: currentUserId,
            user2: otherUserId,
          },
          {
            user2: otherUserId,
            user1: currentUserId,
          },
        ],
      })
      .populate({ path: 'user2', select: 'name surname username avatar' })
      .select('-users -admins')
      .lean(false)
      .exec();
  }

  makeCurrentUserAsUser1(dialog: Chat, currentUserId: string): Chat {
    if (String(dialog.user1['_id']) === String(currentUserId)) return dialog;
    else {
      const tmp = dialog.user1;
      dialog.user1 = dialog.user2;
      dialog.user2 = tmp;
      dialog.title = `${dialog.user2.name} ${dialog.user2.surname}`;
      return dialog;
    }
  }
}
