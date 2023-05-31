import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../users/user.service';
import { AuthService } from '../auth.service';
import { JwtPayloadType } from '../types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey:
        configService.get('ACCESS_SECRET') ||
        configService.get('REFRESH_SECRET'),
    });
  }

  async validate(payload: JwtPayloadType) {
    return await this.usersService.findByEmail(payload.email);
  }
}
