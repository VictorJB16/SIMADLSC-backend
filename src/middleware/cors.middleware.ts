import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin','https://simadlsc-lscc.vercel.app/');  // Permitir solicitudes desde cualquier origen
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,REJECT,APPROVE');  // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');  // Cabeceras permitidas
    next();
  }
}
