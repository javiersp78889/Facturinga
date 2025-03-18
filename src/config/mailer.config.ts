import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const MailerOrmConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // `false` para STARTTLS (puerto 587)
    auth: {
      user: configService.get<string>('USER'),
      pass: configService.get<string>('PASS'),
    },
  },
  defaults: {
    from: `"Soporte" <${configService.get<string>('USER')}>`, // Nombre del remitente
  },
});
