import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { EspectaculoEntity } from 'src/espectaculo/espectaculo.entity';
import { EspectaculoRepository } from 'src/espectaculo/espectaculo.repository';
import { ImagenDto } from './dto/imagen.dto';
import { ImagenEntity } from './imagen.entity';
import { ImagenRepository } from './imagen.repository';

@Injectable()
export class ImagenService {

    constructor(

        @InjectRepository(ImagenEntity)
        private imagenRepository: ImagenRepository,
        @InjectRepository(EspectaculoEntity)
        private espectaculoRepository: EspectaculoRepository,
        ) { }


        async getAll(): Promise<ImagenEntity[]> {
            const list = await this.imagenRepository.find();
            //compruebo que la lista no esté vacía
            if (!list.length) {
                throw new NotFoundException(new MessageDto('No hay fotos'))
            }
            return list;
        }

    
    async findById(id: number): Promise<ImagenEntity> {
        const imagen = await this.imagenRepository.findOne(id);
        if (!imagen) {
            throw new NotFoundException(new MessageDto('no existe la imagen'));
        }
        return imagen;
    }


    async create(dto: any): Promise<any> {

        console.log(dto.espectaculo);
        const espectaculo = await this.espectaculoRepository.findOne(dto.espectaculo);
        if(!espectaculo) throw new BadGatewayException(new MessageDto('No existe ese espectaculo'));
        //compruebo que no exista un espectáculo que se llame igual
        const { nombre} = dto;
        const exists = await this.imagenRepository.findOne({where: [{ nombre: nombre }]});
        if (exists) throw new BadGatewayException(new MessageDto('Esa imagen ya existe'));
        //sino
        const imagen = new ImagenEntity();
        imagen.nombre = dto.nombre;
        imagen.espectaculo = dto.espectaculo;

      //  const tt = this.espectaculoRepository.create(dto);
        await this.imagenRepository.save(imagen);
        // return{message: 'usuario creado'};
        return new MessageDto('imagen creado');
    }


    async update(id: number, dto: ImagenDto): Promise<any> {
        const imagen = await this.findById(id);
        if (!imagen)
            throw new BadGatewayException(new MessageDto('Esa imagen no existe'));
        const exists = await this.findById(dto.id);
        if (exists && exists.id !== id) throw new BadGatewayException(new MessageDto('Esa imagen ya existe'));
        
        dto.nombre ? imagen.nombre = dto.nombre : imagen.nombre = imagen.nombre
      
        await this.imagenRepository.save(imagen);
        //  return { message: 'usuario actualizado' };
        return new MessageDto('Imagen actualizada');

    }

    async delete(id: number): Promise<any> {
        const imagen = await this.findById(id);
        await this.imagenRepository.delete(imagen);
        //  return { message: `usuario eliminado ${usuario.user}` };
        return new MessageDto('imagen eliminada');

    }
}
