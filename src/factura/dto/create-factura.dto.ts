import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

class ItemDto {
    @IsNotEmpty({ message: 'El nombre no puede ir vacio' })
    name: string;
    @IsNotEmpty({ message: 'El nombre no puede ir vacio' })
    description: string;
    @IsNotEmpty({ message: 'La cantidad no puede ir vacia' })
    @IsNumber()
    quantity: number;
    @IsNotEmpty({ message: 'El precio no puede ir vacio' })
    @IsNumber()
    price: number;

}



export class CreateFacturaDto {

    @IsNotEmpty({ message: 'El nombre no puede ir vacio' })

    name: string;

    @IsNotEmpty({ message: 'La cédula no puede ir vacio' })
    cedula: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsNotEmpty({ message: 'El motivo no puede ir vacio' })
    motivo: string;

    @IsArray()
    @ArrayNotEmpty({message: 'Los Contenidos no pueden ir vacios'})
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    items:ItemDto[]


}
