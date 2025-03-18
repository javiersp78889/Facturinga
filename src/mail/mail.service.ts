import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }
  async create(email: string, token: string) {
    console.log(email)
    try {
      await this.mailerService.sendMail({
        from: 'javiers78889@gmail.com',
        to: email,
        subject: 'Verifique su Cuenta',
        text: `tu codigo de verificacion ${token}`,
        html: `<p>Tu codigo de autenticacion ${token}</p>`
      })
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }


  }
  async confirmacion(email: string) {
    try {
      await this.mailerService.sendMail({
        from: 'javiers78889@gmail.com',
        to: email,
        subject: 'Cuenta Confirmada',
        text: `Cuenta Confirmada`,
        html: `<p>Ahora puede iniciar Sesión</p>`
      })
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }


  }


}
