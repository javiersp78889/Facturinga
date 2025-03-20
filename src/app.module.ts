import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { FacturaModule } from './factura/factura.module';
import { ItemsModule } from './items/items.module';
import { MailModule } from './mail/mail.module';
import { LoginModule } from './login/login.module';
import { JwtStrategy } from './auth/jwt.strategy';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync({ useFactory: typeOrmConfig, inject: [ConfigService], imports: [ConfigModule] }),
    UsersModule,
    FacturaModule,
    ItemsModule,
    MailModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
