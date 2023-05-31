import { BadRequestException } from '@nestjs/common';

export class PostHelpers {
  compareIds(reqestSenderId: string, postAuhtorId: string): void {
    if (String(reqestSenderId) !== String(postAuhtorId))
      throw new BadRequestException(
        'Попытка изменения поста пользователем, не являющимся создателем',
      );
  }
}
