import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { listenerCount } from 'process';
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


    async findListByUser(artId: number):Promise<EspectaculoEntity[]>{


        const list = await this.espectaculoRepository.find({where: [{usuario: artId}]});
        if (!list) throw new BadGatewayException(new MessageDto('Aún no tiene espectáculos disponibles'));
        return list;
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    async findById(id: number): Promise<EspectaculoEntity> {
        const espectaculo = await this.espectaculoRepository.findOne(id);
        if (!espectaculo) {
            throw new NotFoundException(new MessageDto('no existe el espectáculo'));
        }
        return espectaculo;
    }
    /**
     * 
     * @param dto 
     * @returns 
     */
    async create(dto: any): Promise<any> {

      //  console.log(dto.usuario);
        const usuario = await this.usuarioRepository.findOne(dto.usuario);
        if(!usuario) throw new BadGatewayException(new MessageDto('No existe ese usuario'));
        //compruebo que no exista un espectáculo que se llame igual
        const { nombre} = dto;
        const exists = await this.espectaculoRepository.findOne({where: [{ nombre: nombre }]});
        if (exists) throw new BadGatewayException(new MessageDto('Ese espectáculo ya existe'));
        //sino
        const espectaculo = new EspectaculoEntity();
        espectaculo.usuario= usuario;
        espectaculo.nombre = dto.nombre;
        espectaculo.descripcion = dto.descripcion;
        espectaculo.imagen = dto.imagen;

        espectaculo.precio = dto.precio;

      //  const tt = this.espectaculoRepository.create(dto);
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
      //  if (exists && exists.id !== id) throw new BadGatewayException(new MessageDto('Ese usuario ya existe'));
        
        dto.nombre ? espectaculo.nombre = dto.nombre : espectaculo.nombre = espectaculo.nombre
        dto.descripcion ? espectaculo.descripcion = dto.descripcion : espectaculo.descripcion = espectaculo.descripcion;
        dto.precio ? espectaculo.precio = dto.precio : espectaculo.precio = espectaculo.precio;
        dto.imagen ? espectaculo.imagen = dto.imagen : espectaculo.imagen = espectaculo.imagen;

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
