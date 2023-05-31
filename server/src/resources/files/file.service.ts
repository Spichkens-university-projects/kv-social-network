import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, remove, writeFile } from 'fs-extra';
import { IMediaReponse } from './file.interface';

@Injectable()
export class FileService {
  // Запись
  async saveFile(
    mediaFile: Express.Multer.File,
    folder = 'default',
    currentUserId: string,
  ): Promise<IMediaReponse> {
    if (folder.startsWith('/')) {
      folder = folder.substring(1);
    }
    const uploadsDir = '/uploads';
    const currentUserUploadDir = `${uploadsDir}/${currentUserId}/${folder}`;

    const folderToSave = `${path}/${currentUserUploadDir}/`;
    await ensureDir(folderToSave);
    const pathToSave = `${folderToSave}/${mediaFile.originalname}`;
    await writeFile(pathToSave, mediaFile.buffer);
    const url = `${currentUserUploadDir}/${mediaFile.originalname}`;
    return {
      url,
      name: mediaFile.originalname,
    };
  }

  // Удаление
  async removeFile(url): Promise<{ url: string }> {
    const urlToRemove = `${path}/${url}`;
    await remove(urlToRemove);
    return { url };
  }
}
