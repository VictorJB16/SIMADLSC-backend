// src/mailer/mailer.module.ts
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailerCustomService } from './mailer.service';

// Configuración constante de SMTP
const SMTP_CONFIG = {
  host: 'smtp.gmail.com',  // Cambia esto por tu host SMTP
  port: 587,
  secure: false,
  auth: {
    user: 'tu-email@gmail.com',
    pass: 'contraseña-de-aplicación', // Asegúrate de usar una contraseña de aplicación si usas Gmail
  },
  tls: {
    rejectUnauthorized: false, // Opcional, útil para pruebas
  },
};

@Module({
  imports: [
    MailerModule.forRoot({
      transport: SMTP_CONFIG,
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(process.cwd(), 'src', 'mailer', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailerCustomService],
  exports: [MailerCustomService],
})
export class MailerCustomModule {}
