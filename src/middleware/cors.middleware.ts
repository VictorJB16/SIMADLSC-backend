import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');  // Permitir solicitudes desde cualquier origen
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');  // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');  // Cabeceras permitidas
    next();
  }
}
