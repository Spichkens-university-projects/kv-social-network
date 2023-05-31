import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UserModule } from '../users/user.module';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { FriendsHelper } from './friends.helper';
import { FriendsTransactions } from './friends.transactions';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [FriendController],
  providers: [FriendService, FriendsHelper, FriendsTransactions],
  exports: [FriendService],
})
export class FriendModule {}
