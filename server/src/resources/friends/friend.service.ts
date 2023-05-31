import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { UserService } from '../users/user.service';
import { FriendsHelper } from './friends.helper';
import { FriendsTransactions } from './friends.transactions';

@Injectable()
export class FriendService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly friendsHelper: FriendsHelper,
    private readonly friendsTransactions: FriendsTransactions,
    private readonly userService: UserService,
  ) {}

  async getUser(currentUserId: string): Promise<User> {
    return await this.userService.findById(currentUserId);
  }

  async getFriendById(
    currentUserId: string,
    otherUserId: string,
  ): Promise<User> {
    const { otherUser } = await this.friendsHelper.checkIfBothUsersExist(
      currentUserId,
      otherUserId,
    );
    await this.friendsHelper.checkIfUserHasFriend(currentUserId, otherUser);

    return otherUser;
  }

  async sendFriendRequest(
    currentUserId: string,
    otherUserId: string,
  ): Promise<User> {
    const { otherUser } = await this.friendsHelper.checkIfBothUsersExist(
      currentUserId,
      otherUserId,
    );

    const isAlreadySubscribed =
      await this.friendsHelper.checkIfUserHasSubscriber(
        currentUserId,
        otherUser,
      );

    if (isAlreadySubscribed) {
      return await this.friendsTransactions.cancelSubscribeTransaction(
        currentUserId,
        otherUserId,
      );
    }

    return await this.friendsTransactions.SubscribeTransaction(
      currentUserId,
      otherUserId,
    );
  }

  async acceptFriendRequest(
    currentUserId: string,
    otherUserId: string,
  ): Promise<User> {
    const { currentUser, otherUser } =
      await this.friendsHelper.checkIfBothUsersExist(
        currentUserId,
        otherUserId,
      );

    const isOtherUserSubscribed =
      await this.friendsHelper.checkIfUserHasSubscriber(
        currentUserId,
        otherUser,
      );

    if (!isOtherUserSubscribed)
      throw new BadRequestException('Такого запроса в друзья не существует');

    return await this.friendsTransactions.acceptRequestDatabaseTransaction(
      currentUser,
      otherUser,
      currentUserId,
      otherUserId,
    );
  }

  async rejectFriendRequest(
    currentUserId: string,
    otherUserId: string,
  ): Promise<User> {
    const { otherUser } = await this.friendsHelper.checkIfBothUsersExist(
      currentUserId,
      otherUserId,
    );

    const isOtherUserSubscribed =
      await this.friendsHelper.checkIfUserHasSubscriber(
        currentUserId,
        otherUser,
      );

    if (!isOtherUserSubscribed)
      throw new BadRequestException('Такого запроса в друзья не существует');

    return await this.friendsTransactions.cancelSubscribeTransaction(
      otherUserId,
      currentUserId,
    );
  }

  async removeFriend(
    currentUserId: string,
    otherUserId: string,
  ): Promise<User> {
    await this.friendsHelper.checkIfBothUsersExist(currentUserId, otherUserId);
    return await this.friendsTransactions.removeFriendTransaction(
      currentUserId,
      otherUserId,
    );
  }
}
