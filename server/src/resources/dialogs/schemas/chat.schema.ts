import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Message } from '../../../sockets/messages/schemas/message.schema';

export type ChatDocument = Chat & mongoose.Document;

export enum ChatType {
  DIALOG = 'dialog',
  GROUP = 'group',
}

@Schema({ timestamps: true, _id: true })
export class Chat {
  @Prop({ isRequired: true })
  type: ChatType;

  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user1: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user2: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  users: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  admins: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Message.name }] })
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
