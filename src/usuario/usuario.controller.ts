import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    async getAll() {
        return await this.usuarioService.getAll();
    }

  
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto:UsuarioDto){
        return await this.usuarioService.create(dto);
    }


}
