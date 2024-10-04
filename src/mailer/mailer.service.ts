import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerCustomService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService, // Inyectamos ConfigService
  ) {}

  async sendResetPasswordEmail(email_Usuario: string, token: string, nombre_Usuario: string) {
    try {
      // Obtenemos FRONTEND_URL usando ConfigService
      const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:5173/paginainformativa';
      const url = `${frontendUrl}/auth/reset-password?token=${token}`;
      console.log('URL que se pasa a la plantilla:', url); 
      console.log('Datos para el correo:', { email_Usuario, url, nombre_Usuario });
      console.log('FRONTEND_URL:', frontendUrl);
      console.log('SMTP Settings:', {
        host: this.configService.get<string>('SMTP_HOST'),
        port: this.configService.get<number>('SMTP_PORT'),
        secure: this.configService.get<boolean>('SMTP_SECURE'),
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      });

      await this.mailerService.sendMail({
        to: email_Usuario,
        subject: 'Restablecimiento de contraseña',
        template: './reset-password',
        context: {
          nombre_Usuario,
          url, // Enlace para restablecer contraseña
        },
      });
      console.log('Correo enviado correctamente a', email_Usuario);
    } catch (error) {
      console.error('Error al enviar el correo:', error);  // Captura el error completo
    }
  }
}
