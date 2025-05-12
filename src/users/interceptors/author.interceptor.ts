import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: { body: { user: Partial<User> }; user: { userId: number } } =
      context.switchToHttp().getRequest();
    request.body.user = { id: request.user.userId };
    return next.handle();
  }
}
