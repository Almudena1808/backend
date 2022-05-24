import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { EspectaculoDto } from './dto/espectaculo.dto';
import { EspectaculoService } from './espectaculo.service';



@Controller('espectaculo')
export class EspectaculoController {

    constructor(private readonly espectaculoService: EspectaculoService) {}

    @Get()
    async getAll() {
        return await this.espectaculoService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.espectaculoService.findById(id);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto:EspectaculoDto){
        return await this.espectaculoService.create(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number, @Body() dto:EspectaculoDto){
        return await this.espectaculoService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.espectaculoService.delete(id);
    }

}
