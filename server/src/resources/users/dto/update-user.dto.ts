import { PartialType } from '@nestjs/mapped-types';
import { User } from '../schemas/user.schema';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(User)
export class UpdateUserDto extends PartialType(User) {}
