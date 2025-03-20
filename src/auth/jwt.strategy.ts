import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET')!, // Usa la clave secreta del .env
    });
  }

  async validate(payload: any) {

    return { id: payload.id}; // Retorna los datos del usuario
  }
}
