import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerCustomService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordEmail(email: string, token: string, name: string) {
    const url = `http://tu-front-end.com/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Restablecimiento de contraseña',
      template: './reset-password', // Asegúrate de tener una plantilla en ./templates/reset-password.hbs
      context: {
        name,
        url,
      },
    });
  }
}
