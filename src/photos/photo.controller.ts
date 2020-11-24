import {
  Controller,
  Res,
  HttpStatus,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserOwnsPhotoGuard } from '../guards/user-owns-photo.guard';

@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserOwnsPhotoGuard)
  remove(@Param('id') id: number) {
    return this.photoService.remove(+id);
  }
}
