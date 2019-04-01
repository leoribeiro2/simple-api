import {
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (info && info.name === 'TokenExpiredError') {
      throw new HttpException({
        error: 'Sessão inválida',
      }, HttpStatus.UNAUTHORIZED);
    }
    if (err || !user) {
      throw new HttpException({
        error: 'Não autorizado',
      }, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
