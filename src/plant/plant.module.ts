import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantSchema } from './plant.schema';
import { PhotoService } from 'src/photo/photo.service';
import { PhotoSchema } from 'src/photo/photo.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Plant', schema: PlantSchema }]),
    MongooseModule.forFeature([{ name: 'Photo', schema: PhotoSchema }]),
  ],
  controllers: [PlantController],
  providers: [PlantService, PhotoService]
})
export class PlantModule { }