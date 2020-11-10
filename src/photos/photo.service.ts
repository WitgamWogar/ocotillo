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
      
    async addPhoto(createPhotoDTO: CreatePhotoDTO, plantId: number): Promise<Photo> {
        createPhotoDTO.plant_id = plantId;
        
        return this.photosRepository.save(createPhotoDTO);
    }
}


