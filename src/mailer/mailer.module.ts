import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailerCustomService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Servidor SMTP
        port: 587, // Puerto de Gmail para TLS
        secure: false, // `false` para usar STARTTLS en el puerto 587
        auth: {
          user: 'andreylanza3@gmail.com', // Reemplaza con tu correo
          pass: 'nlil hjpl cntp bauq', // Reemplaza con la contraseña de aplicación de Gmail
        },
        tls: {
          rejectUnauthorized: false, // Útil para pruebas; asegúrate de cambiarlo en producción si es necesario
        },
        family: 4, // Usar IPv4, puede ayudar a evitar problemas de conectividad con IPv6
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>', // Correo y nombre por defecto del remitente
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
