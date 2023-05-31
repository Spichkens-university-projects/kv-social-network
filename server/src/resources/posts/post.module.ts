import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UserModule } from '../users/user.module';
import { PostController } from './post.controller';
import { PostHelpers } from './post.helpers';
import { PostService } from './post.service';
import { Post, PostSchema } from './schemas/post.schema';
import { Comment, CommentSchema } from '../comment/schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostHelpers],
  exports: [PostService, PostHelpers],
})
export class PostModule {}
