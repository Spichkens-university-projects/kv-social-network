import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post as MethodPost,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from './schemas/post.schema';
import { IsObjectId } from '../../helpers/ValidateObjectId';
import { AuthRequired } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('posts') // Описание тега
@Controller('posts') // Описание контроллера
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Удаление всех постов' })
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOkResponse({
    description: 'Успешное удаление всех постов из базы данных',
    type: null,
  })
  @Delete('delete-all')
  @HttpCode(HttpStatus.OK)
  async deleteAll() {
    return await this.postService.deleteAll();
  }

  @ApiOperation({
    summary:
      'Получение списка всех постов, отфильтрованного по опциональным параметрам',
  })
  @ApiOkResponse({
    description: 'Список всех постов, отфильтрованный по параметрам',
    type: [Post],
  }) // Описание ответа
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllPosts(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Body('filter') userIDs?: string[],
  ): Promise<Post[]> {
    return this.postService.getAllPosts(limit, page, userIDs);
  }

  @ApiOperation({ summary: 'Получение поста по id' })
  @ApiOkResponse({
    description: 'Пост с указанным идентификатором',
    type: Post,
  }) // Описание ответа
  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  getPostById(@Param('id', IsObjectId) id: string): Promise<Post> {
    return this.postService.getPostById(id);
  }

  @ApiOperation({ summary: 'Создание поста' })
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOkResponse({ description: 'Успешное создание нового поста', type: Post }) // Описание ответа
  @MethodPost('create')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  createPost(
    @CurrentUser('_id') authorId: string,
    @Body() createPostDto: CreatePostDto,
  ): Promise<Post> {
    return this.postService.createPost(authorId, createPostDto);
  }

  @ApiOperation({ summary: 'Обновление поста' })
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOkResponse({ description: 'Успешное обновление поста', type: Post }) // Описание ответа
  @Patch('update/:postId')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  updatePost(
    @CurrentUser('_id') authorId: string,
    @Param('postId', IsObjectId) postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    return this.postService.updatePost(authorId, postId, updatePostDto);
  }

  @ApiOperation({ summary: 'Удаление поста' })
  @ApiBearerAuth('defaultBearerAuth')
  @Delete('delete/:postId')
  @HttpCode(HttpStatus.OK)
  @AuthRequired()
  @ApiOkResponse({ description: 'Успешное удаление поста', type: Post }) // Описание ответа
  deletePost(
    @CurrentUser('_id') authorId: string,
    @Param('postId', IsObjectId) postId: string,
  ): Promise<Post> {
    return this.postService.deletePost(authorId, postId);
  }
}
