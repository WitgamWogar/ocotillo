import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Photo, PhotoDocument } from './photo.schema';
import { CreatePhotoDTO } from './dto/create-photo.dto';

@Injectable()
export class PhotoService {
    constructor(@InjectModel('Photo') private readonly photoModel: Model<PhotoDocument>) { }

    // post a single photo
    async addPhoto(createPhotoDTO: CreatePhotoDTO): Promise<Photo> {
        const newPhoto = new this.photoModel(createPhotoDTO);
        
        return newPhoto.save();
    }
}


