import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { UserModule } from '../../resources/users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../resources/users/schemas/user.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { Chat, ChatSchema } from '../../resources/dialogs/schemas/chat.schema';
import { ChatModule } from '../../resources/dialogs/chat.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
    UserModule,
    ChatModule,
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
