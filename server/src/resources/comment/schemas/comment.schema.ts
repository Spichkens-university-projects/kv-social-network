import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type CommentDocument = Comment & mongoose.Document;

@Schema({ timestamps: true, _id: true })
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  commentator: User;

  @Prop()
  commentText: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
