import { Module } from '@nestjs/common';
import { ImagenService } from './imagen.service';
import { ImagenController } from './imagen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenEntity } from './imagen.entity';
import { EspectaculoEntity } from 'src/espectaculo/espectaculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImagenEntity, EspectaculoEntity])],
  providers: [ImagenService],
  controllers: [ImagenController]
})
export class ImagenModule {}
