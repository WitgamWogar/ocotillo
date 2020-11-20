import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type } from 'os';
import { Photo } from 'src/photos/photo.entity';
import { Repository, UpdateResult } from 'typeorm';
import { PhotoService } from '../photos/photo.service';
import { CreatePlantDTO } from './dto/create-plant.dto';
import { UpdatePlantDTO } from './dto/update-plant.dto';
import { Plant } from './plant.entity';

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(Plant)
    private plantsRepository: Repository<Plant>,
    private photoService: PhotoService,
  ) {}

  async findAll(): Promise<Plant[]> {
    const plants = await this.plantsRepository.find({
      relations: ['photos'],
    });
    return plants;
  }

  async findByUser(userId: number, type: string | null): Promise<Plant[]> {
    let query = this.plantsRepository
      .createQueryBuilder('plants')
      .where({ user_id: userId })
      .leftJoinAndSelect('plants.photos', 'photo');

    if (type) {
      query.andWhere('type = :type', { type: type });
    }

    return query.getMany();
  }

  async findByLocation(locationId: number): Promise<Plant[]> {
    const plants = await this.plantsRepository.find({
      where: {
        location_id: locationId,
      },
      relations: ['photos'],
    });

    return plants;
  }

  async findOne(id: number): Promise<Plant> {
    const plant = await this.plantsRepository.findOne(id, {
      relations: ['photos'],
    });

    return plant;
  }

  async create(createPlantDTO: CreatePlantDTO): Promise<Plant> {
    return this.plantsRepository.save(createPlantDTO);
  }

  async attachPhotos(photos: [], plantId: number): Promise<[]> {
    const plant = await this.plantsRepository.findOne(plantId);
    photos.forEach(photo => {
      this.photoService.addPhoto(photo, plantId);
    });

    return photos;
  }

  async update(
    id: number,
    updatePlantDto: UpdatePlantDTO,
  ): Promise<UpdateResult> {
    const plant = await this.plantsRepository.update(id, updatePlantDto);

    return plant;
  }

  async remove(id: number): Promise<any> {
    const deletedPlant = await this.plantsRepository.delete({
      id: id,
    });

    return deletedPlant;
  }
}
