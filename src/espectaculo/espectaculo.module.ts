import { Module } from '@nestjs/common';import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { EspectaculoController } from './espectaculo.controller';
import { EspectaculoEntity } from './espectaculo.entity';
import { EspectaculoService } from './espectaculo.service';


@Module({
  imports: [TypeOrmModule.forFeature([EspectaculoEntity, UsuarioEntity])],
  providers: [EspectaculoService],
  controllers: [EspectaculoController]
})
export class EspectaculoModule {}
