import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';
import { RolNombre } from 'src/rol/rol.enum';
import { ImagenDto } from './dto/imagen.dto';
import { ImagenService } from './imagen.service';

@Controller('imagen')
export class ImagenController {

    constructor(private readonly imagenService: ImagenService) {}

    @RolDecorator(RolNombre.EMPRESARIO, RolNombre.ARTISTA)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll( ) {
        return await this.imagenService.getAll();
    }

    @RolDecorator(RolNombre.EMPRESARIO, RolNombre.ARTISTA)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.imagenService.findById(id);
    }

    @RolDecorator(RolNombre.ARTISTA) // solo puede crear espectáculos el artista
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto:any){
        
        return await this.imagenService.create(dto);
    }


    @RolDecorator(RolNombre.ARTISTA) // solo puede editarlo el artista
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number, @Body() dto:ImagenDto){
        return await this.imagenService.update(id, dto);
    }

    @RolDecorator(RolNombre.ARTISTA) // solo puede borrarlo el artista
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.imagenService.delete(id);
    }

}
