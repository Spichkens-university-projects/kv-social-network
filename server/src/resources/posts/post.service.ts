import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SELECT_PARAMS,
  USER_EXCLUDING_FIELDS,
} from '../../config/populate.config';
import { UserService } from '../users/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostHelpers } from './post.helpers';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    private readonly postHelpers: PostHelpers,
    private readonly userService: UserService,
  ) {}

  async deleteAll() {
    await this.postModel
      .find()
      .exec()
      .then((res) => {
        res.map((post) => this.postModel.findByIdAndDelete(post.id).exec());
      });
  }

  async getAllPosts(
    limit: number,
    page: number,
    userIds: string[],
  ): Promise<Post[]> {
    let skip;

    if (page && limit) {
      skip = (page - 1) * limit;
    }

    return await this.postModel
      .find({ author: { $nin: userIds } })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'author',
        select: USER_EXCLUDING_FIELDS,
      })
      .populate({
        path: 'likes',
        select: USER_EXCLUDING_FIELDS,
      })
      .populate({
        path: 'comments',
        populate: { path: 'commentator', select: USER_EXCLUDING_FIELDS },
      })
      .sort({ createdAt: 'asc' })
      .lean()
      .exec();
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postModel
      .findById(id)
      .populate({
        path: 'author',
        select: USER_EXCLUDING_FIELDS,
      })
      .populate({
        path: 'likes',
        select: USER_EXCLUDING_FIELDS,
      })
      .lean()
      .exec();

    if (!post) throw new NotFoundException('Пост с таким id е найден');

    return post;
  }

  async createPost(
    authorId: string,
    createPostDto: CreatePostDto,
  ): Promise<Post> {
    const author = await this.userService.findById(authorId);
    const newPost = await this.postModel.create({ author, ...createPostDto });
    await newPost.save();
    return await this.postModel
      .findById(newPost._id)
      .populate({
        path: 'author',
        select: USER_EXCLUDING_FIELDS,
      })
      .select(SELECT_PARAMS)
      .lean()
      .exec();
  }

  async updatePost(
    authorId: string,
    postId: string,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const author = await this.userService.findById(authorId);
    const post = await this.getPostById(postId);

    this.postHelpers.compareIds(post.author['_id'], author['_id']);

    return await this.postModel
      .findByIdAndUpdate(postId, { ...updatePostDto }, { new: true })
      .populate({
        path: 'author',
        select: USER_EXCLUDING_FIELDS,
      })
      .select(SELECT_PARAMS)
      .lean()
      .exec();
  }

  async deletePost(authorId: string, postId: string): Promise<Post> {
    const author = await this.userService.findById(authorId);
    const post = await this.getPostById(postId);
    this.postHelpers.compareIds(post.author['_id'], author['_id']);

    return await this.postModel.findByIdAndRemove(postId).exec();
  }
}
