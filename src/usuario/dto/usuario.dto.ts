import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { NotBlack } from "src/decorators/notblack.decorator";

export class UsuarioDto {

    
    @NotBlack({message: 'El nombre del usuario no puede estar vacío'})
    user?: string;

    @NotBlack({message: 'El nombre no puede estar vacío'})
    nombre?: string;

    @NotBlack({message: 'Los apellidos no puede estar vacío'})
    apellidos?: string;

    @NotBlack({message: 'El email no puede estar vacío'})
    contrasenia?: string;

    @NotBlack({message: 'El teléfono no puede estar vacío'})
    telefono?: string;

    @NotBlack({message: 'El email no puede estar vacío'})
    email?: string;

  
    @NotBlack({message: 'El email no puede estar vacío'})
    direccion?: string;

    @NotBlack({message: 'La foto no puede estar vacía'})
    foto?: string;
}