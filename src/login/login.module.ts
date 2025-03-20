import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule,

  JwtModule.registerAsync({
    imports: [ConfigModule],  // Importa ConfigModule para acceder a las variables de entorno
    inject: [ConfigService],  // Inyecta ConfigService
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('SECRETO'), // Obtiene la variable de entorno
      signOptions: { expiresIn: '3600s' },
    })

  })

  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule { }
