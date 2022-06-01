import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { RolEntity } from 'src/rol/rol.entity';
import { RolNombre } from 'src/rol/rol.enum';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: UsuarioRepository,
        @InjectRepository(RolEntity)
        private rolRepository: RolRepository
    ) {}
    /**
     * 
     * @returns 
     */
    async getAll(): Promise<UsuarioEntity[]> {
        const list = await this.usuarioRepository.find();
        //compruebo que la lista no esté vacía
        if (!list.length) {
            throw new NotFoundException(new MessageDto('No hay ningún usuario'))
        }
        return list;
    }


    /**
     * 
     * @param dto 
     * @returns 
     */
    async create(dto: UsuarioDto): Promise<any> {
        const {user, email} = dto;
        const exists = await this.usuarioRepository.findOne({where: [{user: user}, {email: email}]});
        if (exists) throw new BadRequestException(new MessageDto('Ese usuario ya existe'));
        const rolEmp = await this.rolRepository.findOne({where: {rolNombre: RolNombre.EMPRESARIO}});
        const rolArt = await this.rolRepository.findOne({where: {rolNombre: RolNombre.ARTISTA}});

        if(!rolArt ||!rolEmp) throw new InternalServerErrorException(new MessageDto('Los roles no han sido creados'));
        const emp = this.usuarioRepository.create(dto);
        emp.roles = [rolEmp];
        await this.usuarioRepository.save(emp);
        return new MessageDto('Empresario creado')

    }
}
