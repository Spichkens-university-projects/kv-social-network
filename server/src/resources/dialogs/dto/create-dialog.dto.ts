import { ChatType } from '../schemas/chat.schema';

export class CreateDialogDto {
  user1: string;
  user2: string;
  type: ChatType;
}
