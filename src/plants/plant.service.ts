import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoService } from '../photos/photo.service';
import { CreatePlantDTO } from './dto/create-plant.dto';
import { Plant } from './plant.entity';

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(Plant)
    private plantsRepository: Repository<Plant>,
    private photoService: PhotoService,
  ) {}

  // fetch all plants
  async getAllPlants(): Promise<Plant[]> {
    const plants = await this.plantsRepository.find({
      relations: ['photos'],
    });
    return plants;
  }

  // get plants for specific user
  async getUserPlants(userId: number): Promise<Plant[]> {
    const plants = await this.plantsRepository.find({
      where: {
        user_id: userId,
      },
      relations: ['photos'],
    });
    
    return plants;
  }

  // Get a single plant
  async getPlant(plantId): Promise<Plant> {
    //TODO figure out ownership guards
    const plant = await this.plantsRepository.findOne(plantId, {
      relations: ['photos', 'activities'],
    });
    
    return plant;
  }

  // post a single plant
  async addPlant(createPlantDTO: CreatePlantDTO): Promise<Plant> {
    return this.plantsRepository.save(createPlantDTO);
  }

  // post a single plant
  async attachPhotos(photos: [], plantId: number): Promise<[]> {
    const plant = await this.plantsRepository.findOne(plantId);
    photos.forEach(photo => {
      this.photoService.addPhoto(photo, plantId);
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
  async deletePlant(plantId): Promise<any> {
    const deletedPlant = await this.plantsRepository.delete({
      id: plantId,
    });
    
    return deletedPlant;
  }
}
