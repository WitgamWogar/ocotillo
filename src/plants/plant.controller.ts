import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Body,
  NotFoundException,
  ClassSerializerInterceptor,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Param,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PlantService } from './plant.service';
import { CreatePlantDTO } from './dto/create-plant.dto';
import { UpdatePlantDTO } from './dto/update-plant.dto';
import { diskStorage } from 'multer';
import { generateFilename, imageFileFilter } from '../utils/file-upload';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserOwnsPlantGuard } from 'src/guards/user-owns-plant.guard';

@Controller('plant')
export class PlantController {
  constructor(private plantService: PlantService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createPlantDTO: CreatePlantDTO) {
    createPlantDTO.user_id = req.user.userId;
    const plant = await this.plantService.create(createPlantDTO);

    return {
      status: HttpStatus.OK,
      message: 'Plant created successfully!',
      data: plant,
    };
  }

  @Post('photos')
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: diskStorage({
        destination: './public/uploads/plants',
        filename: generateFilename,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @UseGuards(JwtAuthGuard, UserOwnsPlantGuard)
  async storePlantPhotos(
    @Request() req,
    @UploadedFiles() files,
    @Body('plantId') plantId,
  ) {
    const response = [];

    this.plantService.attachPhotos(files, plantId, req.user.userId);

    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('type/:type?')
  async findAll(@Request() req, @Param('type') type: string | null) {
    const plants = await this.plantService.findByUser(req.user.userId, type);

    return {
      status: HttpStatus.OK,
      data: plants,
    };
  }

  @UseGuards(JwtAuthGuard, UserOwnsPlantGuard)
  @Get(':id')
  async find(@Param('id') plantId) {
    const plant = await this.plantService.findOne(plantId);
    if (!plant) throw new NotFoundException('Plant does not exist!');
    return {
      status: HttpStatus.OK,
      data: plant,
    };
  }

  @UseGuards(JwtAuthGuard, UserOwnsPlantGuard)
  @Get('/location/:locationId')
  async findByLocation(@Param('locationId') locationId) {
    const plants = await this.plantService.findByLocation(locationId);

    return {
      status: HttpStatus.OK,
      data: plants,
    };
  }

  @UseGuards(JwtAuthGuard, UserOwnsPlantGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePlantDto: UpdatePlantDTO,
  ) {
    const plant = await this.plantService.update(id, updatePlantDto);

    if (!plant) throw new NotFoundException('Plant does not exist!');

    return this.plantService.update(+id, updatePlantDto);
  }

  @UseGuards(JwtAuthGuard, UserOwnsPlantGuard)
  @Delete(':id')
  async remove(@Param('id') plantId) {
    const plant = await this.plantService.remove(plantId);

    if (!plant) throw new NotFoundException('Plant does not exist');

    return {
      status: HttpStatus.OK,
      message: 'Plant has been deleted!',
      data: plant,
    };
  }
}
