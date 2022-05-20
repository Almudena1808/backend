import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: UsuarioRepository
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
     * @param id 
     * @returns 
     */
    async findById(id: number): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne(id);
        if (!usuario) {
            throw new NotFoundException(new MessageDto('no existe el usuario'));
        }
        return usuario;
    }
    /**
     * 
     * @param user 
     * @returns 
     */
    async findByUsuario(user: string): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne({ user: user });
        return usuario;
    }
    /**
     * 
     * @param dto 
     * @returns 
     */
    async create(dto: UsuarioDto): Promise<any> {
        const exists = await this.findByUsuario(dto.user);
        if (exists) throw new BadGatewayException(new MessageDto('Ese usuario ya existe'));
        const usuario = this.usuarioRepository.create(dto);
        await this.usuarioRepository.save(usuario);
        // return{message: 'usuario creado'};
        return new MessageDto('usuario creado');
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
        const exists = await this.findByUsuario(dto.user);
        if (exists && exists.id !== id) throw new BadGatewayException(new MessageDto('Ese usuario ya existe'));

        dto.nombre ? usuario.nombre = dto.nombre : usuario.nombre = usuario.nombre;
        dto.apellidos ? usuario.apellidos = dto.apellidos : usuario.apellidos = usuario.apellidos;
        dto.contrasenia ? usuario.contrasenia = dto.contrasenia : usuario.contrasenia = usuario.contrasenia;
        dto.telefono ? usuario.telefono = dto.telefono : usuario.telefono = usuario.telefono;
        dto.email ? usuario.email = dto.email : usuario.email = usuario.email;
        dto.direccion ? usuario.direccion = dto.direccion : usuario.direccion = usuario.direccion;
        dto.foto ? usuario.foto = dto.foto : usuario.foto = usuario.foto;

        await this.usuarioRepository.save(usuario);
        //  return { message: 'usuario actualizado' };
        return new MessageDto('usuario actualizado');

    }
    /**
     * 
     * @param id 
     * @returns 
     */
    async delete(id: number): Promise<any> {
        const usuario = await this.findById(id);
        await this.usuarioRepository.delete(usuario);
        //  return { message: `usuario eliminado ${usuario.user}` };
        return new MessageDto('usuario eliminado');

    }
}
