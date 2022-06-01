import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { EmpresarioEntity } from 'src/empresario/empresario.entity';
import { EspectaculoEntity } from 'src/espectaculo/espectaculo.entity';
import { ContratoEntity } from './contrato.entity';
import { ContratoRepository } from './contrato.repository';
import { ContratoDto } from './dto/contrato.dto';


@Injectable()
export class ContratoService {

    constructor(
        @InjectRepository(ContratoEntity)
        private contratoRepository: ContratoRepository
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

    async findContratoByEmpresario(emp: EmpresarioEntity): Promise<ContratoEntity> {
        const usuario = await this.contratoRepository.findOne({empresario: emp});
        if (!usuario) {
            throw new NotFoundException(new MessageDto('no existe el contrato del empresario'));
        }
        return usuario;
    }
    /**
     * 
     * @param emp 
     * @param esp 
     * @param fe 
     * @returns 
     */
    async findContratoByEmpEspFechEsp(emp: EmpresarioEntity, esp: EspectaculoEntity, fe :Date): Promise<ContratoEntity> {
        const contrato = await this.contratoRepository.findOne({empresario: emp, espectaculo: esp, fechaEvento: fe});
        if (!contrato) {
            throw new NotFoundException(new MessageDto('no existe el contrato del empresario con esas características'));
        }
        return contrato;
    }
    
    /**
     * 
     * @param dto 
     * @returns 
     */
    async create(dto: ContratoDto): Promise<any> {
        const exists = await this.findContratoByEmpEspFechEsp(dto.empresario, dto.espectaculo, dto.fechaEvento);
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
        if (exists && exists.id !== id) throw new BadGatewayException(new MessageDto('Ese contrato ya existe'));
        //solo pongo que se pueden editar esos atributos porque solo son esos los que quiero que se puedan modificar
        dto.aceptado ? contrato.aceptado = dto.aceptado : contrato.aceptado = contrato.aceptado;
        dto.espectaculo ? contrato.espectaculo = dto.espectaculo : contrato.espectaculo = contrato.espectaculo;
        dto.fechaEvento ? contrato.fechaEvento = dto.fechaEvento : contrato.fechaEvento = contrato.fechaEvento;
     
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
}
