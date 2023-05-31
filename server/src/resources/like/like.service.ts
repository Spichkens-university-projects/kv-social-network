import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_EXCLUDING_FIELDS } from 'src/config/populate.config';
import { Post, PostDocument } from '../posts/schemas/post.schema';
import { UserService } from '../users/user.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    private readonly userService: UserService,
  ) {}

  async likePost(currentUserId: string, postId: string): Promise<PostDocument> {
    const currentUser = await this.userService.findById(currentUserId);

    const post = await this.postModel.findOne({
      _id: postId,
      likes: { $in: currentUser },
    });

    if (!post) {
      return await this.postModel
        .findByIdAndUpdate(
          postId,
          { $push: { likes: currentUserId } },
          { new: true },
        )
        .lean()
        .exec();
    } else
      return await this.postModel
        .findByIdAndUpdate(
          postId,
          { $pull: { likes: currentUserId } },
          { new: true },
        )
        .lean()
        .exec();
  }

  async getPostLikes(postId: string): Promise<Pick<Post, 'likes'>> {
    return await this.postModel
      .findById(postId)
      .select('likes')
      .populate({
        path: 'likes',
        select: USER_EXCLUDING_FIELDS,
      })
      .lean()
      .exec();
  }

  async getLikedPosts(currentUserId: string): Promise<Post[]> {
    const currentUser = await this.userService.findById(currentUserId);
    return await this.postModel.find({ likes: { $in: currentUser } }).exec();
  }
}
