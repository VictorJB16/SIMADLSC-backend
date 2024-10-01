import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailerCustomService } from './mailer.service'; // Aquí solo está el servicio

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'bustosvictor042@gmail.com', // Cambia por tu email
          pass: 'xbrb ukms lcfc knhw', // Cambia por tu contraseña
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'), 
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailerCustomService], // MailerCustomService va en providers
  exports: [MailerCustomService], // Exportamos si lo necesitamos en otros módulos
})
export class MailerCustomModule {}
