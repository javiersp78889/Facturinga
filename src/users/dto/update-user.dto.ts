import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsEmail()
    email: string
}
export class NewUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @Length(6)
    password: string
}
