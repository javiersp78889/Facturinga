import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginService {
  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) { }
  @InjectRepository(User) private readonly userRepository: Repository<User>

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)

    if (! await bcrypt.compare(password, user.password)) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)

    const token = await this.jwtService.signAsync({ id: user.id }, {
      secret: this.configService.get('SECRET'),

    })


    return token;
  }

  async validate(token: string) {
    const valid = await this.jwtService.verify(token)
    if(!valid)  throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
  }

}
