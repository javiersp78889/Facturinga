import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {

        console.log(configService.get('USER'))
         console.log(configService.get('PASS'))
       

        return {
          transport: createTransport({

            host: 'smtp.gmail.com',
            secure: false,
            port: 587,    
            auth: {
              user: configService.get('USER'),  // Asegúrate de que la variable de entorno se lea correctamente
              pass: configService.get('PASS'),  // Asegúrate de que la variable de entorno se lea correctamente
            },
          })
        };
      },
      inject: [ConfigService],  // Asegúrate de que ConfigService esté siendo inyectado
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
