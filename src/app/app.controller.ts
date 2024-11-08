// src/app.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return '¡Bienvenido a la aplicación!';
  }

  @Get('favicon.ico')
  getFavicon(@Res() res: Response): void {
    res.sendFile(join(__dirname, '..', 'public', 'favicon.ico'));
  }
}
