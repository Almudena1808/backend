import { Module } from '@nestjs/common';import { TypeOrmModule } from '@nestjs/typeorm';
import { EspectaculoController } from './espectaculo.controller';
import { EspectaculoEntity } from './espectaculo.entity';
import { EspectaculoService } from './espectaculo.service';


@Module({
  imports: [TypeOrmModule.forFeature([EspectaculoEntity])],
  providers: [EspectaculoService],
  controllers: [EspectaculoController]
})
export class EspectaculoModule {}
