import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArtistaDto } from './dto/artista.dto';
import { ArtistaService } from './artista.service'; 

@Controller('artista')
export class ArtistaController {

    constructor(private readonly artistaService: ArtistaService) {}

    @Get()
    async getAll() {
        return await this.artistaService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.artistaService.findById(id);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto:ArtistaDto){
        return await this.artistaService.create(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number, @Body() dto:ArtistaDto){
        return await this.artistaService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.artistaService.delete(id);
    }

}
