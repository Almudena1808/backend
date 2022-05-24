import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { ArtistaEntity } from './artista.entity';
import { ArtistaRepository } from './artista.repository';
import { ArtistaDto } from './dto/artista.dto';

@Injectable()
export class ArtistaService {

    constructor(
        @InjectRepository(ArtistaEntity)
        private artistaRepository: ArtistaRepository
    ) { }
    /**
     * 
     * @returns 
     */
    async getAll(): Promise<ArtistaEntity[]> {
        const list = await this.artistaRepository.find();
        //compruebo que la lista no esté vacía
        if (!list.length) {
            throw new NotFoundException(new MessageDto('No hay ningún usuario'))
        }
        return list;
    }
    /**
     * 
     * @param id 
     * @returns 
     */
    async findById(id: number): Promise<ArtistaEntity> {
        const artista = await this.artistaRepository.findOne(id);
        if (!artista) {
            throw new NotFoundException(new MessageDto('no existe artista'));
        }
        return artista;
    }

    async findByUsuario(usuar: UsuarioEntity): Promise<ArtistaEntity> {
        const usuario = await this.artistaRepository.findOne({usuario: usuar});
        if (!usuario) {
            throw new NotFoundException(new MessageDto('no existe ttt'));
        }
        return usuario;
    }
    
    /**
     * 
     * @param dto 
     * @returns 
     */
    async create(dto: ArtistaDto): Promise<any> {
        const exists = await this.findByUsuario(dto.usuario);
        if (exists) throw new BadGatewayException(new MessageDto('Ese usuario ya existe'));
        const artista = this.artistaRepository.create(dto);
        await this.artistaRepository.save(artista);
        // return{message: 'usuario creado'};
        return new MessageDto('artista creado');
    }
    /**
     * 
     * @param id 
     * @param dto 
     * @returns 
     */
    async update(id: number, dto: ArtistaDto): Promise<any> {
        const artista = await this.findById(id);
        if (!artista)
            throw new BadGatewayException(new MessageDto('Ese artista no existe'));
        const exists = await this.findById(dto.id);
        if (exists && exists.id !== id) throw new BadGatewayException(new MessageDto('Ese usuario ya existe'));

        dto.descripcion ? artista.descripcion = dto.descripcion : artista.descripcion = artista.descripcion;
        dto.especializacion ? artista.especializacion = dto.especializacion : artista.especializacion = artista.especializacion;
        dto.fechNac ? artista.fechNac = dto.fechNac : artista.fechNac = artista.fechNac;
     
        await this.artistaRepository.save(artista);
        //  return { message: 'usuario actualizado' };
        return new MessageDto('artista actualizado');

    }
    /**
     * 
     * @param id 
     * @returns 
     */
    async delete(id: number): Promise<any> {
        const artista = await this.findById(id);
        await this.artistaRepository.delete(artista);
        //  return { message: `usuario eliminado ${usuario.user}` };
        return new MessageDto('artista eliminado');

    }
}
