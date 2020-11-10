import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from './plant.entity';
import { PhotoService } from '../photos/photo.service';
import { Photo } from '../photos/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plant]),
    TypeOrmModule.forFeature([Photo]),
  ],
  controllers: [PlantController],
  providers: [PlantService, PhotoService]
})
export class PlantModule { }