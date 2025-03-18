import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { NewUserDto, UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { generateNumber } from 'src/utils/generateNumber';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly sendMail: MailService

  ) { }

  async Verify(email: string, name: string) {
    const usuario = await this.userRepository.findOne({ where: { name } })
    const correo = await this.userRepository.findOne({ where: { email } })

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

      const user = this.userRepository.create(createUserDto)
      const random = generateNumber()
      user.token = random

      const usuario = await this.userRepository.save(user)
      await this.sendMail.create(email, user.token)
      return usuario;
    } else {

      return 'Usuario en uso'
    }

  }
  async findUser(token: string) {
    const user = await this.userRepository.findOne({ where: { token }, select: ['id', 'token', 'name', 'email', 'auth'] })

    if (!user) {
      return { message: 'Usuario no encontrado' }
    }
    else {
      return user
    }
  }

  async findOne(token: string) {

    const user = await this.findUser(token)
    if ('message' in user) {
      throw new Error(user.message); // O manejar el error de otra forma
    }

    user.auth = true;
    user.token = '';

    await this.userRepository.save(user); // Guardar los cambios

    await this.sendMail.confirmacion(user.email)

    return 'Validado';
  }


  async senRecoveryToken(updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto

    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) {
      return { message: 'Usuario no encontrado' }
    }

    else {
      const random = generateNumber()
      user.token = random
      await this.userRepository.save(user);

      await this.sendMail.create(email, user.token)


      return { message: 'Revisa tu correo' }
    }


  }

  async findToken(token: string) {

    const user = await this.findUser(token)
    return user
  }

  async newPassword(id: number, newUserDto: NewUserDto) {

    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      return { message: 'Usuario no encontrado' }
    }

    user.password = newUserDto.password

    await this.userRepository.save(user)

    return 'Password Actualizada'
  }
}
