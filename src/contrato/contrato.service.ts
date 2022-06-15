import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { EspectaculoEntity } from 'src/espectaculo/espectaculo.entity';
import { EspectaculoRepository } from 'src/espectaculo/espectaculo.repository';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { ContratoEntity } from './contrato.entity';
import { ContratoRepository } from './contrato.repository';
import { ContratoDto } from './dto/contrato.dto';


@Injectable()
export class ContratoService {

    constructor(
        @InjectRepository(ContratoEntity)
        private contratoRepository: ContratoRepository,
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: UsuarioRepository,
        @InjectRepository(EspectaculoEntity)
        private espectaculoRepository: EspectaculoRepository
    ) { }
    /**
     * 
     * @returns 
     */
    async getAll(): Promise<ContratoEntity[]> {
        const list = await this.contratoRepository.find();
        //compruebo que la lista no esté vacía
        if (!list.length) {
            throw new NotFoundException(new MessageDto('No hay ningún contrato '))
        }
        return list;
    }
    /**
     * 
     * @param id 
     * @returns 
     */
    async findById(id: number): Promise<ContratoEntity> {
        const artista = await this.contratoRepository.findOne(id);
        if (!artista) {
            throw new NotFoundException(new MessageDto('no existe el contrato'));
        }
        return artista;
    }

 
    /**
     * 
     * @param dto 
     * @returns 
     */

    async create(dto: any): Promise<any> {
        const { fechaEvento, empresario, espectaculo } = dto;

        const existEmp = await this.usuarioRepository.findOne(empresario);
        if (!existEmp) throw new BadGatewayException(new MessageDto('Ese empresario no existe'));
        const existEsp = await this.espectaculoRepository.findOne(espectaculo);
        if (!existEsp) throw new BadGatewayException(new MessageDto('Ese espectáculo no existe'));
        const exists = await this.contratoRepository.findOne({ where: [{ fechaEvento: fechaEvento, espectaculo: espectaculo, empresario: empresario }] })
        if (exists) throw new BadGatewayException(new MessageDto('Ese contrato ya existe'));
        const contrato = this.contratoRepository.create(dto);
        await this.contratoRepository.save(contrato);
        // return{message: 'usuario creado'};
        return new MessageDto('contrato creado');
    }

    /**
     * 
     * @param id 
     * @param dto 
     * @returns 
     */
    async update(id: number, dto: ContratoDto): Promise<any> {
        const contrato = await this.findById(id);
        if (!contrato)
            throw new BadGatewayException(new MessageDto('Ese contrato no existe'));
        const exists = await this.findById(dto.id);
       // if (exists && exists.id !== id) throw new BadGatewayException(new MessageDto('Ese contrato ya existe'));
        //solo pongo que se pueden editar esos atributos porque solo son esos los que quiero que se puedan modificar
        dto.aceptado ? contrato.aceptado = dto.aceptado : contrato.aceptado = contrato.aceptado;
        dto.fechaFirma ? contrato.fechaFirma = dto.fechaFirma : contrato.fechaFirma = contrato.fechaFirma;

        await this.contratoRepository.save(contrato);
        //  return { message: 'usuario actualizado' };
        return new MessageDto('contrato actualizado');

    }
    /**
     * 
     * @param id 
     * @returns 
     */
    async delete(id: number): Promise<any> {
        const contrato = await this.findById(id);
        await this.contratoRepository.delete(contrato);
        //  return { message: `usuario eliminado ${usuario.user}` };
        return new MessageDto('artiscontratota eliminado');

    }


    async findListByEmp(empId: number):Promise<ContratoEntity[]>{


        const list = await this.contratoRepository.find({where: [{empresario: empId}]});
        if (!list) throw new BadGatewayException(new MessageDto('Aún no tiene contratos'));
        return list;
    }

    async findListByEsp(espId: number):Promise<ContratoEntity[]>{


        const list = await this.contratoRepository.find({where: [{espectaculo: espId}]});
        if (!list) throw new BadGatewayException(new MessageDto('Aún no ha sido contratado'));
        return list;
    }

    
    async findOneEspByUser(contId: number):Promise<any>{

        const cont = await this.contratoRepository.findOne(contId);
        if (!cont) throw new BadGatewayException(new MessageDto('No existe ese contrato'));
        console.log(cont)
      //  const esp = cont.espectaculo.id;

     //   const espectaculo = await this.espectaculoRepository.findOne(esp);
//return espectaculo;
    }

}
