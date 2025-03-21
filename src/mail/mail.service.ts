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
        subject: 'FACTURINGA:Verifique su Cuenta',
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
        subject: 'FACTURINGA:Cuenta Confirmada',
        text: `Cuenta Confirmada`,
        html: `<p>Ahora puede iniciar Sesión</p><br/> 

       <div style="text-align: center; background-color: #8b00ff">
          <a href="https://www.404-code.com/" 
            style="display: inline-block; background-color: #ff8f00; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 5px;">
            Iniciar Sesión
          </a>
        </div>`
      })
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }


  }
  async aviso(email: string) {
    try {
      await this.mailerService.sendMail({
        from: 'javiers78889@gmail.com',
        to: email,
        subject: 'FACTURINGA:Ha iniciado Sesión',
        text: `Ha iniciado Sesión`,
        html: `<p>Si ha sido usted puede ignorar este mensaje, de lo contrario cambie su contraseña</p><br/> 

       <div style="text-align: center; background-color: #8b00ff">
          <a href="https://www.404-code.com/" 
            style="display: inline-block; background-color: #ff8f00; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 5px;">
            Change Password
          </a>
        </div>

        
        `
      })
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }


  }
  async factura(pdfPath: string, email: string, name: string, documento: string) {
    try {
      console.log(email)
      await this.mailerService.sendMail({
        from: 'javiers78889@gmail.com',
        to: email,
        subject: 'FACTURINGA:Ha Recibido una factura',
        text: `Ha Recibido una factura`,
        html: `<p>Hola ${name}, aqui tiene su factura</p><br/> 

        
        `,
        attachments: [
          {
            filename: `${documento}.pdf`,
            path: pdfPath, // Ruta del archivo PDF
            contentType: 'application/pdf',
          },
        ]



      })
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }


  }


}
