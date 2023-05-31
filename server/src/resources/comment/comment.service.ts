import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../posts/schemas/post.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { USER_EXCLUDING_FIELDS } from '../../config/populate.config';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async create(currentUserId: string, createCommentDto: CreateCommentDto) {
    const newComment = await this.commentModel.create({
      commentator: currentUserId,
      ...createCommentDto,
    });
    const post = await this.postModel
      .findByIdAndUpdate(
        createCommentDto.postId,
        { $push: { comments: newComment } },
        { new: true },
      )
      .populate({
        path: 'comments',
        populate: { path: 'commentator', select: USER_EXCLUDING_FIELDS },
      })
      .populate({ path: 'author', select: USER_EXCLUDING_FIELDS });

    return post;
  }
}
