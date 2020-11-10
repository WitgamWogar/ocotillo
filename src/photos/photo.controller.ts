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
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}
}
