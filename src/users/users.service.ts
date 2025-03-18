import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly productRepository: Repository<User>,
    private readonly sendMail : MailService

  ) { }

  async Verify(email: string, name: string) {

    const usuario = await this.productRepository.findOne({ where: { name } })
    const correo = await this.productRepository.findOne({ where: { email } })

    if (usuario || correo) {
      return true
    } else {
      return false;
    }


  }
  async create(createUserDto: CreateUserDto) {
    const { email, name } = createUserDto

    const encontrar = await this.Verify(email, name)


    if (!encontrar) {

      const usuario = await this.productRepository.save(createUserDto)

      await this.sendMail.sendMail(email, '123456')
      return usuario;
    } else {

      return 'Usuario en uso'
    }


  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
