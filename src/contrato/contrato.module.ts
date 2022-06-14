import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspectaculoEntity } from 'src/espectaculo/espectaculo.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { ContratoController } from './contrato.controller';
import { ContratoEntity } from './contrato.entity';
import { ContratoService } from './contrato.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContratoEntity, UsuarioEntity, EspectaculoEntity])],
  providers: [ContratoService],
  controllers: [ContratoController]
})
export class ContratoModule { }
