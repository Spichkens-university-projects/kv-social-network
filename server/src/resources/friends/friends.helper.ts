import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { UserService } from '../users/user.service';

@Injectable()
export class FriendsHelper {
  constructor(
    private readonly userService: UserService,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async checkIfBothUsersExist(
    id1: string,
    id2: string,
  ): Promise<{ currentUser: User; otherUser: User }> {
    const currentUser = await this.userService.findById(id1);
    const otherUser = await this.userService.findById(id2);
    return { currentUser, otherUser };
  }

  async checkIfUserHasFriend(userId: string, user: User): Promise<User> {
    const areFriends = await this.userModel
      .findOne({
        _id: userId,
        friends: { $in: user },
      })
      .exec();
    if (!areFriends)
      throw new BadRequestException(`Пользователи не являются друзьями`);
    return areFriends;
  }

  async checkIfUserHasSubscriber(userId: string, user: User): Promise<User> {
    return await this.userModel
      .findOne({
        _id: userId,
        subscribers: { $in: user },
      })
      .exec();
  }
}
