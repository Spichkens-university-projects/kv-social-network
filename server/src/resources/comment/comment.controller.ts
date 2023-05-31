import { Body, Controller, Patch } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthRequired } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { IsObjectId } from '../../helpers/ValidateObjectId';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Patch('create')
  @AuthRequired()
  createComment(
    @CurrentUser('_id', IsObjectId) commentatorId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(commentatorId, createCommentDto);
  }
}
