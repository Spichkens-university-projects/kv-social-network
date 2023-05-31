import { ChatType } from '../../resources/dialogs/schemas/chat.schema';
import { Message } from './schemas/message.schema';

export interface AddMessageResponse {
  chatId: string;
  type: ChatType;
  message: Message;
}
