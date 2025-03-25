import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFiles, UploadedFile, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, fileImageDto } from './dto/create-user.dto';
import { NewUserDto, UpdateUserDto } from './dto/update-user.dto';
import { IdValidationPipe, TokenValidationPipe } from 'src/id-validation/id-validation';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

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

  //Subir Imagen de perfil

  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  profileImage(@UploadedFile() file: Express.Multer.File) {

    if(!file){
      throw new BadRequestException('No hay imagen')
    }

    return this.cloudinaryService.uploadImage(file)

  }
}
