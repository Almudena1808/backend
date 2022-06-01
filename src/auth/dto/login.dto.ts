import { MinLength } from "class-validator";
import { NotBlack } from "src/decorators/notblack.decorator";

export class LoginUsuarioDto {

    @NotBlack({message: 'La contraseña no puede estar vacío'})
    @MinLength(4, {message:'El nombre de usuario tiene que tener al menos 4 carácteres'})
    user?: string;

    @NotBlack({message: 'La contraseña no puede estar vacío'})
    contrasenia?: string;

}