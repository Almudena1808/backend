import { IsEnum } from "class-validator";
import { RolNombre } from "../rol.enum";

export class CreateRolDto{

    @IsEnum(RolNombre, {message: 'el rol solo puede ser artista o empresario'})
    rolNombre: String;
}