import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Factura } from './entities/factura.entity';
import { Item } from 'src/items/entities/item.entity';
import { MailModule } from 'src/mail/mail.module';
import { GeneratePdfModule } from 'src/generate-pdf/generate-pdf.module'
@Module({
  imports: [TypeOrmModule.forFeature([User, Factura, Item]), MailModule, GeneratePdfModule],
  controllers: [FacturaController],
  providers: [FacturaService],
})
export class FacturaModule { }
