import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PhotoService } from './photo.service';
import { CreatePhotoDTO } from './dto/create-photo.dto';
import { diskStorage } from 'multer';

@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  // // add photos
  // @Post()
  // @UseInterceptors(FilesInterceptor('files'))
  // uploadFile(@UploadedFiles() files) {
  //   console.log(files);
  // }
}
