import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // authorize the user if they have access to the route
    next();
  }
}
