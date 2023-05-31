import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../../resources/users/schemas/user.schema';

export type MessageDocument = Message & mongoose.Document;

@Schema({ timestamps: true, _id: true })
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  sender: User;

  @Prop()
  messageText: string;

  @Prop()
  media: string[];

  @Prop({ default: false })
  isRead: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
