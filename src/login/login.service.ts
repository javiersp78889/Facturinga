import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { use } from 'passport';
import { format, isAfter, isBefore } from 'date-fns';

@Injectable()
export class LoginService {
  constructor(private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly Advice: MailService) { }
  @InjectRepository(User) private readonly userRepository: Repository<User>

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto
    const date = format(new Date, 'yyyy-MM-dd')

    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)

    if (! await bcrypt.compare(password, user.password)) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
    if (!user.auth) throw new HttpException('Cuenta no Verificada', HttpStatus.CONFLICT)
    if (!user.membresia) throw new HttpException('Cuenta suspendida, verifique su método de pago', HttpStatus.CONFLICT)
    if (isAfter(new Date, user.expDate)) throw new HttpException('Cuenta suspendida, verifique su método de pago', HttpStatus.CONFLICT)


      const token = await this.jwtService.signAsync({ id: user.id }, {
        secret: this.configService.get('SECRET'),

      })

    await this.Advice.aviso(email)
    return token;
  }

  async validate(token: string) {
    const valid = await this.jwtService.verify(token)
    if (!valid) throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    return valid
  }

}
