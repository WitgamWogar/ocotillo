import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDTO } from './dto/create-photo.dto';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
  ) {}

  async createMultiple(
    photos: CreatePhotoDTO[],
    plantId: number,
    userId: number,
  ): Promise<Photo[]> {
    photos.forEach(photo => {
      photo.plant_id = plantId;
      photo.user_id = userId;
    });

    return this.photosRepository.save(photos);
  }

  async findOne(id: number): Promise<Photo> {
    const photo = await this.photosRepository.findOne(id);

    return photo;
  }

  async remove(id: number): Promise<any> {
    const deletedPhoto = await this.photosRepository.delete({
      id: id,
    });

    return deletedPhoto;
  }
}
