import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailerOrmConfig } from 'src/config/mailer.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: MailerOrmConfig,
      inject: [ConfigService],  // Asegúrate de que ConfigService esté siendo inyectado
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
