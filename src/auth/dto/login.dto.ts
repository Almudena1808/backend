import { MinLength } from "class-validator";
import { NotBlack } from "src/decorators/notblack.decorator";

export class LoginUsuarioDto {

    @NotBlack({message: 'El nombre de usuario o email no puede estar vacío'})
    user?: string;

    @NotBlack({message: 'La contraseña no puede estar vacío'})
    contrasenia?: string;

}