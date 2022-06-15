import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { ContratoDto } from './dto/contrato.dto';


@Controller('contrato')
export class ContratoController {

    constructor(private readonly contratoService: ContratoService) { }

    @Get()
    async getAll() {
        return await this.contratoService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.contratoService.findById(id);
    }

    @Get('busca/:id')
    async getListEmp(@Param('id', ParseIntPipe) id: number) {
        return await this.contratoService.findListByEmp(id);
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    async create(@Body() dto: any) {
        return await this.contratoService.create(dto);
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
        return await this.contratoService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.contratoService.delete(id);
    }

    @Get('mirar/:contId')
    async getOneByEmp(@Param('contId', ParseIntPipe) contId: number) {
        return await this.contratoService.findOneEspByUser(contId);
    }

    @Get('esp/:id')
    async getListContByEsp(@Param('id', ParseIntPipe) id: number) {
        return await this.contratoService.findListByEsp(id);
    }

}
