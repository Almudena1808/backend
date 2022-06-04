import { IsEmail, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { NotBlack } from "src/decorators/notblack.decorator";

export class NuevoUsuarioArtDto {


    @IsString()
    @MinLength(4, {message:'El nombre de usuario tiene que tener al menos 4 carácteres'})
    user?: string;

    @NotBlack({message: 'El nombre no puede estar vacío'})
    @IsString()
    nombre?: string;

    @NotBlack({message: 'Los apellidos no puede estar vacío'})
    @IsString()    
    apellidos?: string;

    @NotBlack({message: 'La contraseña no puede estar vacío'})
    contrasenia?: string;

    @NotBlack({message: 'El teléfono no puede estar vacío'})
    telefono?: string;

    @IsEmail()
    @NotBlack({message: 'El email no puede estar vacío'})
    email?: string;

  
    @NotBlack({message: 'La dirección no puede estar vacío'})
    direccion?: string;

    @NotBlack({message: 'La foto no puede estar vacía'})
    foto?: string;
}