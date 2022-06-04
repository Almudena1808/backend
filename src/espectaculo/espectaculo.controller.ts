import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';
import { RolNombre } from 'src/rol/rol.enum';
import { EspectaculoDto } from './dto/espectaculo.dto';
import { EspectaculoService } from './espectaculo.service';



@Controller('espectaculo')
export class EspectaculoController {

    constructor(private readonly espectaculoService: EspectaculoService) {}

    @RolDecorator(RolNombre.EMPRESARIO, RolNombre.ARTISTA)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll( ) {
        return await this.espectaculoService.getAll();
    }

    @RolDecorator(RolNombre.EMPRESARIO, RolNombre.ARTISTA)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.espectaculoService.findById(id);
    }


    @RolDecorator(RolNombre.ARTISTA) // solo puede crear espectáculos el artista
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto:EspectaculoDto){
        return await this.espectaculoService.create(dto);
    }


    @RolDecorator(RolNombre.ARTISTA) // solo puede editarlo el artista
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number, @Body() dto:EspectaculoDto){
        return await this.espectaculoService.update(id, dto);
    }

    @RolDecorator(RolNombre.ARTISTA) // solo puede borrarlo el artista
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.espectaculoService.delete(id);
    }

}
