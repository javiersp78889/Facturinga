import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { Item } from 'src/items/entities/item.entity';


@Injectable()
export class FacturaService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Factura) private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly dataSource: DataSource

  ) { }

  async findUser(id: number) {

    const find = await this.userRepository.findOne({ where: { id }, select: ['id', 'email', 'name'] })
    if (!find) throw new NotFoundException('Usuario No encontrado')
    return find

  }
  async create(createFacturaDto: CreateFacturaDto, userId: number) {
    const { name, cedula, motivo, items } = createFacturaDto;
    const usuario = await this.findUser(userId);

    const total = items.reduce((tot, n) => (n.price * n.quantity) + tot, 0);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1️⃣ Guardar factura
      const factura = queryRunner.manager.create(this.facturaRepository.target, {
        name,
        cedula,
        motivo,
        total,
        user: usuario
      });

      await queryRunner.manager.save(this.facturaRepository.target, factura);

      // 2️⃣ Guardar ítems correctamente con for...of
      for (const item of items) {
        const newItem = queryRunner.manager.create(this.itemRepository.target, {
          ...item,
          facturaId: factura.id,
        });

        await queryRunner.manager.save(this.itemRepository.target, newItem);
      }

      // 3️⃣ Confirmar transacción
      await queryRunner.commitTransaction();
      return factura;
    } catch (error) {
      // ❌ Si hay error, hacer rollback
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 🔄 Liberar el queryRunner
      await queryRunner.release();
    }
  }


  async findAll(id: number) {
    const facturas = await this.facturaRepository.findAndCount({ where: { userId: id }, relations: ['items'], take: 5 })

    return facturas;
  }

  async findOne(id: number) {
    const factura = await this.facturaRepository.findOne({ where: { id } })
    return `This action returns a #${id} factura`;
  }

  update(id: number, updateFacturaDto: UpdateFacturaDto) {
    return `This action updates a #${id} factura`;
  }

  async remove(id: number) {




    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const item = await queryRunner.manager.delete('item', { facturaId: id })
      const factura = await queryRunner.manager.delete('factura', id)
      await queryRunner.commitTransaction();
      return { message: 'Factura Eliminada' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
