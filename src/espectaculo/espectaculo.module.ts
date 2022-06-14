import { Module } from '@nestjs/common';import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoEntity } from 'src/contrato/contrato.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { EspectaculoController } from './espectaculo.controller';
import { EspectaculoEntity } from './espectaculo.entity';
import { EspectaculoService } from './espectaculo.service';


@Module({
  imports: [TypeOrmModule.forFeature([EspectaculoEntity, UsuarioEntity, ContratoEntity])],
  providers: [EspectaculoService],
  controllers: [EspectaculoController]
})
export class EspectaculoModule {}
