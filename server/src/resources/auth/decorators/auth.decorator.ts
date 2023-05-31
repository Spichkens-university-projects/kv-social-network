import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const AuthRequired = () => UseGuards(AuthGuard('jwt'));
