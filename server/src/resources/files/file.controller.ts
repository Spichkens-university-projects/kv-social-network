import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IMediaReponse } from './file.interface';
import { AuthRequired } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../users/decorators/current-user.decorator';

@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({
    summary: 'Загрузка файлов на сервер',
  })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    type: String,
    required: true,
    name: 'folder',
    description: 'Директория хранения файла на сервере',
  })
  @AuthRequired()
  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @CurrentUser('_id') currentUserId: string,
    @UploadedFile() mediaFile: Express.Multer.File,
    @Query('folder') folder: string,
  ): Promise<IMediaReponse> {
    return await this.fileService.saveFile(mediaFile, folder, currentUserId);
  }

  @ApiOperation({
    summary: 'Удаление файлов на сервере',
  })
  @ApiQuery({
    type: String,
    required: false,
    name: 'url',
    description: 'Путь до удаляемого файла на сервере',
  })
  @AuthRequired()
  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  async deleteFile(@Query('url') folder?: string): Promise<{ url: string }> {
    return await this.fileService.removeFile(folder);
  }
}
