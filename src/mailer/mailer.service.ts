import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerCustomService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendResetPasswordEmail(email_Usuario: string, token: string, nombre_Usuario: string) {
    try {
      // Usa la URL de frontend especificada o por defecto a la de producción
      const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'https://simadlsc.vercel.app';
      const url = `${frontendUrl}/auth/reset-password?token=${token}`;
      
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
      console.error('Error al enviar el correo:', error);
    }
  }
}
