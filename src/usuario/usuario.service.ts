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
    ) { }
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
        const { user, email } = dto;
        const exists = await this.usuarioRepository.findOne({ where: [{ user: user }, { email: email }] });
        if (exists) throw new BadRequestException(new MessageDto('Ese usuario ya existe'));
        const rolEmp = await this.rolRepository.findOne({ where: { rolNombre: RolNombre.EMPRESARIO } });
        const rolArt = await this.rolRepository.findOne({ where: { rolNombre: RolNombre.ARTISTA } });

        if (!rolArt || !rolEmp) throw new InternalServerErrorException(new MessageDto('Los roles no han sido creados'));
        const emp = this.usuarioRepository.create(dto);
        emp.roles = [rolEmp];
        await this.usuarioRepository.save(emp);
        return new MessageDto('Empresario creado')

    }

    /**
   * 
   * @param id 
   * @returns 
   */
    async findById(id: number): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne(id);
        if (!usuario) {
            throw new NotFoundException(new MessageDto('Este usuario no existe'));
        }
        return usuario;
    }
/**
 * 
 * @param id 
 * @param dto 
 * @returns 
 */
    async update(id: number, dto: UsuarioDto): Promise<any> {
        const usuario = await this.findById(id);
        if (!usuario)
            throw new BadGatewayException(new MessageDto('Ese usuario no existe'));
        const exists = await this.findById(dto.id);
        if (exists && exists.id !== id) throw new BadGatewayException(new MessageDto('Ese usuario ya existe'));
        
        dto.nombre ? usuario.nombre = dto.nombre : usuario.nombre = usuario.nombre;
        dto.apellidos ? usuario.apellidos = dto.apellidos : usuario.apellidos = usuario.apellidos;
        dto.email ? usuario.email = dto.email : usuario.email = usuario.email;
        dto.direccion ? usuario.direccion = dto.direccion : usuario.direccion = usuario.direccion;
        dto.telefono ? usuario.telefono = dto.telefono : usuario.telefono = usuario.telefono;
        dto.foto ? usuario.foto = dto.foto : usuario.telefono = usuario.foto;
        dto.contrasenia ? usuario.contrasenia = dto.contrasenia : usuario.contrasenia = usuario.contrasenia;
        dto.fechNac ? usuario.fechNac = dto.fechNac: usuario.fechNac= usuario.fechNac;
        dto.descripcion ? usuario.descripcion = dto.descripcion: usuario.descripcion= usuario.descripcion;
        dto.especializacion ? usuario.especializacion = dto.especializacion: usuario.especializacion= usuario.especializacion;
        dto.organizacion ? usuario.organizacion = dto.organizacion: usuario.organizacion= usuario.organizacion;

     
        await this.usuarioRepository.save(usuario);
        //  return { message: 'usuario actualizado' };
        return new MessageDto('Usuario actualizado');

    }
}
