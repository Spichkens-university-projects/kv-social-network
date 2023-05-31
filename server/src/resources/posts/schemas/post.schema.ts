import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Comment } from '../../comment/schemas/comment.schema';

export type PostDocument = Post & mongoose.Document;

@Schema({ timestamps: true, _id: true })
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  author: User;

  @Prop()
  description: string;

  @Prop()
  content: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  likes: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Comment.name }] })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
