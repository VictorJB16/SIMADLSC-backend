// src/matricula/matricula.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as fs from 'fs';

import { MatriculaController } from './matricula.controller';
import { MatriculaService } from './matricula.service';
import { Matricula } from './entities/matricula.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Usuario } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { MailerCustomModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Matricula,
      Estudiante,
      EncargadoLegal,
      Grado,
      Seccion,
      Usuario,
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          let identifier = 'temp';
          try {
            // Usa la cédula o gradoId para nombrar la carpeta
            const payload = JSON.parse((req.body as any).data);
            identifier = payload.estudiante.cedula || String(payload.estudiante.gradoId);
          } catch {
            // si no parsea, se queda 'temp'
          }
          const uploadPath = join(process.cwd(), 'uploads', `est-${identifier}`);
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const ext = file.originalname.slice(file.originalname.lastIndexOf('.'));
          const base = file.originalname.replace(/\.[^/.]+$/, '');
          cb(null, `${base}-${Date.now()}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(pdf|jpe?g|png)$/)) {
          return cb(new Error('Sólo PDF o imágenes'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024,  // 10 MB por archivo
        files: 10,                   // hasta 10 archivos por request
      },
    }),
    UsersModule,
    MailerCustomModule,
  ],
  controllers: [MatriculaController],
  providers: [MatriculaService],
})
export class MatriculaModule {}
