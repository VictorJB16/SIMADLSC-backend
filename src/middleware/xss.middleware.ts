import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XssProtectionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body && typeof req.body === 'object') {
      for (const key in req.body) {
        if (typeof req.body[key] === 'string') {
          req.body[key] = req.body[key].replace(/</g, '&lt;').replace(/>/g, '&gt;');  // Escapa las etiquetas HTML
        }
      }
    }
    next();
  }
}
