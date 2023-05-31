import { ChatType } from '../schemas/chat.schema';

export class CreatePublicChatDto {
  users?: string[];
  admins: string[];
  title?: string;
  type: ChatType;
}
