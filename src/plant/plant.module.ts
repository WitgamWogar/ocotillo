import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantSchema } from './plant.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Plant', schema: PlantSchema }])
  ],
  controllers: [PlantController],
  providers: [PlantService]
})
export class PlantModule { }