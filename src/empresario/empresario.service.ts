import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { EmpresarioDto } from './dto/empresario.dto';
import { EmpresarioEntity } from './empresario.entity';
import { EmpresarioRepository } from './empresario.repository';

@Injectable()
export class EmpresarioService {

    constructor(
        @InjectRepository(EmpresarioEntity)
        private empresarioRepository: EmpresarioRepository
    ) { }
    /**
     * 
     * @returns 
     */
    async getAll(): Promise<EmpresarioEntity[]> {
        const list = await this.empresarioRepository.find();
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
    async findById(id: number): Promise<EmpresarioEntity> {
        const artista = await this.empresarioRepository.findOne(id);
        if (!artista) {
            throw new NotFoundException(new MessageDto('no existe artista'));
        }
        return artista;
    }

    async findByUsuario(usuar: UsuarioEntity): Promise<EmpresarioEntity> {
        const usuario = await this.empresarioRepository.findOne({usuario: usuar});
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
    async create(dto: EmpresarioDto): Promise<any> {
        const exists = await this.findByUsuario(dto.usuario);
        if (exists) throw new BadGatewayException(new MessageDto('Ese usuario ya existe'));
        const artista = this.empresarioRepository.create(dto);
        await this.empresarioRepository.save(artista);
        // return{message: 'usuario creado'};
        return new MessageDto('empresario creado');
    }
    /**
     * 
     * @param id 
     * @param dto 
     * @returns 
     */
    async update(id: number, dto: EmpresarioDto): Promise<any> {
        const empresario = await this.findById(id);
        if (!empresario)
            throw new BadGatewayException(new MessageDto('Ese artista no existe'));
        const exists = await this.findById(dto.id);
        if (exists && exists.id !== id) throw new BadGatewayException(new MessageDto('Ese usuario ya existe'));

        dto.organizacion ? empresario.organizacion = dto.organizacion : empresario.organizacion = empresario.organizacion;
       
        await this.empresarioRepository.save(empresario);
        //  return { message: 'usuario actualizado' };
        return new MessageDto('empresario actualizado');

    }
    /**
     * 
     * @param id 
     * @returns 
     */
    async delete(id: number): Promise<any> {
        const empresario = await this.findById(id);
        await this.empresarioRepository.delete(empresario);
        //  return { message: `usuario eliminado ${usuario.user}` };
        return new MessageDto('empresario eliminado');

    }
}
