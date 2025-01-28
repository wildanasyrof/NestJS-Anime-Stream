import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      const message =
        info?.message === 'jwt expired'
          ? 'Token expired, please log in again'
          : 'Invalid token, please provide a valid one';
      throw new UnauthorizedException({
        status: 'error',
        message: 'Unauthorized',
        errors: message,
      });
    }
    return user;
  }
}
