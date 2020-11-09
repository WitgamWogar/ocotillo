import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PhotoService } from '../photo/photo.service';
import { CreatePlantDTO } from './dto/create-plant.dto';
import { PlantDocument } from './plant.schema';

@Injectable()
export class PlantService {
  constructor(
    @InjectModel('Plant')
    @Inject(PhotoService)
    private readonly plantModel: Model<PlantDocument>,
    private photoService: PhotoService
  ) {}

  // fetch all plants
  async getAllPlants(): Promise<PlantDocument[]> {
    const plants = await this.plantModel.find().populate({path: 'photos', model: 'Photo'}).exec();
    return plants;
  }

  // Get a single plant
  async getPlant(plantId): Promise<PlantDocument> {
    const plant = await this.plantModel.findById(plantId).populate('Photos').exec();
    return plant;
  }

  // post a single plant
  async addPlant(createPlantDTO: CreatePlantDTO): Promise<PlantDocument> {
    const newPlant = new this.plantModel(createPlantDTO);
    return newPlant.save();
  }

  // post a single plant
  async attachPhotos(photos: [], plantId: String): Promise<[]> {
    const plant = await this.plantModel.findById(plantId).exec();
      photos.forEach((photo) => {
          this.photoService.addPhoto(photo).then((record) => {
            plant.photos.push(record);
            plant.save();
          });
      });

    return photos;
  }

  // Edit plant details
  // async updatePlant(plantID, createPlantDTO: CreatePlantDTO): Promise<Plant> {
  //     const updatedPlant = await this.plantModel
  //         .findByIdAndUpdate(plantID, createPlantDTO, { new: true });
  //     return updatedPlant;
  // }

  // Delete a plant
  async deletePlant(plantID): Promise<any> {
    const deletedPlant = await this.plantModel.findByIdAndRemove(plantID);
    return deletedPlant;
  }
}
