import { User } from '../../users/schemas/user.schema';

export interface LoginResponseType {
  user: User;
  accessToken: string;
  refreshToken: string;
}
