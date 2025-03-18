import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NewUserDto, UpdateUserDto } from './dto/update-user.dto';
import { IdValidationPipe, TokenValidationPipe } from 'src/id-validation/id-validation';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }



  @Post(':token/validate')
  findOne(@Param('token', TokenValidationPipe) token: string) {
    return this.usersService.findOne(token);
  }

  @Post('/recovery-password')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.senRecoveryToken(updateUserDto);
  }

  @Get(':token')
  findUser(@Param('token', TokenValidationPipe) token: string) {
    return this.usersService.findToken(token);
  }

  @Put(':id/new-password')
  newPassword(@Param('id', IdValidationPipe) id: string, @Body() newUserDto: NewUserDto) {
    return this.usersService.newPassword(+id, newUserDto)
  }
}
