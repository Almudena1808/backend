import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmpresarioDto } from './dto/empresario.dto';
import { EmpresarioService } from './empresario.service';


@Controller('empresario')
export class EmpresarioController {

    constructor(private readonly empresarioService: EmpresarioService) {}

    @Get()
    async getAll() {
        return await this.empresarioService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.empresarioService.findById(id);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto:EmpresarioDto){
        return await this.empresarioService.create(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number, @Body() dto:EmpresarioDto){
        return await this.empresarioService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.empresarioService.delete(id);
    }

}
