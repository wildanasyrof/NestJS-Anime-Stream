import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user?.role !== 'ADMIN') {
      throw new HttpException(
        {
          message: 'Forbidden',
          errors: 'You do not have permission to access this resource',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
