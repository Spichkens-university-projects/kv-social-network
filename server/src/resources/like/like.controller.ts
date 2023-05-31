import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { IsObjectId } from '../../helpers/ValidateObjectId';
import { AuthRequired } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { LikeService } from './like.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Post } from '../posts/schemas/post.schema';
import { User } from '../users/schemas/user.schema';

@ApiTags('likes')
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiOperation({ summary: 'Лайк/дизлайк поста' })
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOkResponse({ description: 'Успешное лайк/дизлайк поста', type: Post })
  @Put('set-like/:postId')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  likePost(
    @CurrentUser('_id', IsObjectId) currentUserId: string,
    @Param('postId', IsObjectId) postId: string,
  ) {
    return this.likeService.likePost(currentUserId, postId);
  }

  @ApiOperation({ summary: 'Получение лайкнутых текущим пользователем постов' })
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOkResponse({ description: 'Список постов', type: Post, isArray: true })
  @Get('get-liked-posts')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  getLikedPosts(@CurrentUser('_id', IsObjectId) currentUserId: string) {
    return this.likeService.getLikedPosts(currentUserId);
  }

  @ApiOperation({ summary: 'Получение лайкнувших пост пользователей' })
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOkResponse({ description: 'Список постов', type: User, isArray: true })
  @Get('get-post-likes/:postId')
  @HttpCode(HttpStatus.OK)
  getPostLikes(@Param('postId', IsObjectId) postId: string) {
    return this.likeService.getPostLikes(postId);
  }
}
