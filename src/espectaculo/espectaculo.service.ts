import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { EspectaculoDto } from './dto/espectaculo.dto';
import { EspectaculoEntity } from './espectaculo.entity';
import { EspectaculoRepository } from './espectaculo.repository';

@Injectable()
export class EspectaculoService {

    constructor(
        @InjectRepository(EspectaculoEntity)
        private espectaculoRepository: EspectaculoRepository,
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: UsuarioRepository
        ) { }
    /**
     * 
     * @returns 
     */
    async getAll(): Promise<EspectaculoEntity[]> {
        const list = await this.espectaculoRepository.find();
        //compruebo que la lista no esté vacía
        if (!list.length) {
            throw new NotFoundException(new MessageDto('No hay ningún espectáculo'))
        }
        return list;
    }
    /**
     * 
     * @param id 
     * @returns 
     */
    async findById(id: number): Promise<EspectaculoEntity> {
        const artista = await this.espectaculoRepository.findOne(id);
        if (!artista) {
            throw new NotFoundException(new MessageDto('no existe el espectáculo'));
        }
        return artista;
    }
    /**
     * 
     * @param dto 
     * @returns 
     */
    async create(dto: EspectaculoDto): Promise<any> {

        //compruebo que no exista un espectáculo que se llame igual
        const { nombre} = dto;
        const exists = await this.espectaculoRepository.findOne({where: [{ nombre: nombre }]});
        if (exists) throw new BadGatewayException(new MessageDto('Ese espectáculo ya existe'));
        const espectaculo = this.espectaculoRepository.create(dto);
        await this.espectaculoRepository.save(espectaculo);
        // return{message: 'usuario creado'};
        return new MessageDto('espectáculo creado');
    }
    /**
     * 
     * @param id 
     * @param dto 
     * @returns 
     */
    async update(id: number, dto: EspectaculoDto): Promise<any> {
        const espectaculo = await this.findById(id);
        if (!espectaculo)
            throw new BadGatewayException(new MessageDto('Ese espectáculo no existe'));
        const exists = await this.findById(dto.id);
        if (exists && exists.id !== id) throw new BadGatewayException(new MessageDto('Ese usuario ya existe'));
        
        dto.nombre ? espectaculo.nombre = dto.nombre : espectaculo.nombre = espectaculo.nombre
        dto.descripcion ? espectaculo.descripcion = dto.descripcion : espectaculo.descripcion = espectaculo.descripcion;
        dto.precio ? espectaculo.precio = dto.precio : espectaculo.precio = espectaculo.precio;
     
        await this.espectaculoRepository.save(espectaculo);
        //  return { message: 'usuario actualizado' };
        return new MessageDto('Espectáculo actualizado');

    }
    /**
     * 
     * @param id 
     * @returns 
     */
    async delete(id: number): Promise<any> {
        const espectaculo = await this.findById(id);
        await this.espectaculoRepository.delete(espectaculo);
        //  return { message: `usuario eliminado ${usuario.user}` };
        return new MessageDto('espectaculo eliminado');

    }
}
