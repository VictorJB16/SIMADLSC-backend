import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HeaderValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['custom-header']) {
      return res.status(400).json({ message: 'Falta el encabezado personalizado' });
    }
    next();
  }
}
