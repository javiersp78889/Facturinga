import { IsEmail, IsNotEmpty, Length, min } from 'class-validator';


export class CreateUserDto {
    @IsNotEmpty({ message: 'Nombre de la empresa es obligatorio' })
    name: string
    @IsNotEmpty({ message: 'ruc de la empresa es obligatorio' })
    ruc: string
    @IsNotEmpty({ message: 'El email es obligatorio es obligatorio' })
    @IsEmail()
    email: string

    @IsNotEmpty({ message: 'El password es obligatorio' })
    @Length(6, 20, { message: 'El password debe tener entre 6 y 20 caracteres' })
    password: string

}

export class fileImageDto {
    @IsNotEmpty({ message: 'La imagen no puede ir vacia' })
    file: Express.Multer.File

}