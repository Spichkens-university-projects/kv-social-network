import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './resources/auth/auth.module';
import { ChatModule } from './resources/dialogs/chat.module';
import { FileModule } from './resources/files/file.module';
import { FriendModule } from './resources/friends/friend.module';
import { PostModule } from './resources/posts/post.module';
import { UserModule } from './resources/users/user.module';
import { LikeModule } from './resources/like/like.module';
import { CommentModule } from './resources/comment/comment.module';
import { MessagesModule } from './sockets/messages/messages.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    ConfigModule.forRoot(),
    UserModule,
    FileModule,
    AuthModule,
    FriendModule,
    PostModule,
    ChatModule,
    LikeModule,
    CommentModule,
    MessagesModule,
  ],

  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
