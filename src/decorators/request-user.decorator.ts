import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../database/entities/User.entity';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
