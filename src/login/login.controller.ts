import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto'


@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createLoginDto: LoginDto) {
    return this.loginService.login(createLoginDto);
  }

}
