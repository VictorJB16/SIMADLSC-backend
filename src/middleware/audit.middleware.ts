import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req['user'];  // Suponiendo que el usuario autenticado ya está en el request
    console.log(`Acción de auditoría: Usuario ${user?.id} accedió a ${req.url} a las ${new Date()}`);
    next();
  }
}
