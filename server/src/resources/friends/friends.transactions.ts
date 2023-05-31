import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SELECT_PARAMS } from '../../config/populate.config';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
@Injectable()
export class FriendsTransactions {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async SubscribeTransaction(
    currentUserId: string,
    otherUserId: string,
  ): Promise<User> {
    const updatedCurrentUser = await this.userModel
      .findByIdAndUpdate(
        currentUserId,
        { $push: { subscriptions: otherUserId } },
        { new: true },
      )
      .lean()
      .exec();

    const updatedOtherUser = await this.userModel
      .findByIdAndUpdate(
        otherUserId,
        { $push: { subscribers: currentUserId } },
        { new: true },
      )
      .select(SELECT_PARAMS)
      .lean()
      .exec();

    if (!updatedOtherUser || !updatedCurrentUser)
      throw new Error('Ошибка при отправке запроса');
    return updatedOtherUser;
  }

  async acceptRequestDatabaseTransaction(
    senderUser: User,
    otherUser: User,
    currentUserId: string,
    otherUserId: string,
  ): Promise<User> {
    const updatedSender = await this.userModel
      .findByIdAndUpdate(
        currentUserId,
        {
          $pull: { subscribers: otherUserId },
          $push: { friends: otherUser },
        },
        { new: true },
      )
      .lean()
      .exec();

    const updatedOther = await this.userModel
      .findByIdAndUpdate(
        otherUserId,
        {
          $pull: { subscriptions: currentUserId },
          $push: { friends: senderUser },
        },
        { new: true },
      )
      .lean()
      .exec();

    if (!updatedSender || !updatedOther)
      throw new Error('Ошибка при принятии запроса');
    return updatedOther;
  }

  async cancelSubscribeTransaction(
    currentUserId: string,
    otherUserId: string,
  ): Promise<User> {
    const canceledOtherUser = await this.userModel
      .findByIdAndUpdate(
        otherUserId,
        { $pull: { subscribers: currentUserId } },
        { new: true },
      )
      .lean()
      .exec();

    const canceledCurrentUser = await this.userModel
      .findByIdAndUpdate(
        currentUserId,
        { $pull: { subscriptions: otherUserId } },
        { new: true },
      )
      .lean()
      .exec();

    if (!canceledOtherUser || !canceledCurrentUser)
      throw new BadRequestException(`Пользователи не являются друзьями`);
    return canceledOtherUser;
  }

  async removeFriendTransaction(currentUserId: string, otherUserId: string) {
    const updatedSender = await this.userModel
      .findByIdAndUpdate(
        currentUserId,
        { $pull: { friends: otherUserId } },
        { new: true },
      )
      .lean()
      .exec();

    const updatedRemoved = await this.userModel
      .findByIdAndUpdate(
        otherUserId,
        { $pull: { friends: currentUserId } },
        { new: true },
      )
      .lean()
      .exec();

    if (!updatedRemoved || !updatedSender)
      throw new Error('Ошибка при удалении друга');
    return updatedRemoved;
  }
}
