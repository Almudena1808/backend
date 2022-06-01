import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistaEntity } from 'src/artista/artista.entity';
import { MessageDto } from 'src/common/message.dto';
import { EspectaculoDto } from './dto/espectaculo.dto';
import { EspectaculoEntity } from './espectaculo.entity';
import { EspectaculoRepository } from './espectaculo.repository';

@Injectable()
export class EspectaculoService {

    constructor(
        @InjectRepository(EspectaculoEntity)
        private empresarioRepository: EspectaculoRepository
    ) { }
    /**
     * 
     * @returns 
     */
    async getAll(): Promise<EspectaculoEntity[]> {
        const list = await this.empresarioRepository.find();
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
        const artista = await this.empresarioRepository.findOne(id);
        if (!artista) {
            throw new NotFoundException(new MessageDto('no existe el espectáculo'));
        }
        return artista;
    }

    async findByArtista(usuar: ArtistaEntity): Promise<EspectaculoEntity> {
        const usuario = await this.empresarioRepository.findOne({artista: usuar});
        if (!usuario) {
            throw new NotFoundException(new MessageDto('no existe el artista'));
        }
        return usuario;
    }
    
    /**
     * 
     * @param dto 
     * @returns 
     */
    async create(dto: EspectaculoDto): Promise<any> {
        const exists = await this.findByArtista(dto.artista);
        if (exists) throw new BadGatewayException(new MessageDto('Ese espectáculo ya existe'));
        const artista = this.empresarioRepository.create(dto);
        await this.empresarioRepository.save(artista);
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
     
        await this.empresarioRepository.save(espectaculo);
        //  return { message: 'usuario actualizado' };
        return new MessageDto('espectaculo actualizado');

    }
    /**
     * 
     * @param id 
     * @returns 
     */
    async delete(id: number): Promise<any> {
        const espectaculo = await this.findById(id);
        await this.empresarioRepository.delete(espectaculo);
        //  return { message: `usuario eliminado ${usuario.user}` };
        return new MessageDto('espectaculo eliminado');

    }
}
