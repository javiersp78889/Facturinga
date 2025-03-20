import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Factura } from './entities/factura.entity';
import { Item } from 'src/items/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Factura, Item])],
  controllers: [FacturaController],
  providers: [FacturaService],
})
export class FacturaModule { }
