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
  async findAll(): Promise<Plant[]> {
    const plants = await this.plantsRepository.find({
      relations: ['photos'],
    });
    return plants;
  }

  // get plants for specific user
  async findAllUserPlants(userId: number): Promise<Plant[]> {
    const plants = await this.plantsRepository.find({
      where: {
        user_id: userId,
      },
      relations: ['photos'],
    });
    
    return plants;
  }

  // Get a single plant
  async findOne(id: number): Promise<Plant> {
    //TODO figure out ownership guards
    const plant = await this.plantsRepository.findOne(id, {
      relations: ['photos', 'activities'],
    });
    
    return plant;
  }

  // post a single plant
  async create(createPlantDTO: CreatePlantDTO): Promise<Plant> {
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
  async remove(id: number): Promise<any> {
    const deletedPlant = await this.plantsRepository.delete({
      id: id,
    });
    
    return deletedPlant;
  }
}
