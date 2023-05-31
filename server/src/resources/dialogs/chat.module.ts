import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { ChatHelpers } from './chat.helpers';
import {
  Message,
  MessageSchema,
} from '../../sockets/messages/schemas/message.schema';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatHelpers],
  exports: [ChatService, ChatHelpers],
})
export class ChatModule {}
