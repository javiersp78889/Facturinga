import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }
  async sendMail(email: string, token: string) {
    console.log(email)
    try {
      await this.mailerService.sendMail({
        from:'javiers78889@gmail.com',
        to: email,
        subject: 'Verifique su Cuenta',
        text: `tu codigo de verificacion ${token}`,
        html: `<p>Tu codigo de autenticacion ${token}</p>`
      })
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
    

  }
}
