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
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PlantService } from './plant.service';
import { CreatePlantDTO } from './dto/create-plant.dto';
import { diskStorage } from 'multer';
import { generateFilename, imageFileFilter } from '../utils/file-upload';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('plant')
export class PlantController {
  constructor(private plantService: PlantService) {}

  // add a plant
  @Post()
  @UseGuards(JwtAuthGuard)
  async addPlant(@Request() req, @Body() createPlantDTO: CreatePlantDTO) {
    createPlantDTO.user_id = req.user.userId;
    const plant = await this.plantService.addPlant(createPlantDTO);
    
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
  async storePlantPhotos(@UploadedFiles() files, @Body('plantId') plantId) {
    const response = [];

    this.plantService.attachPhotos(files, plantId);

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

  // Retrieve plants list
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPlants(@Request() req) {
    const plants = await this.plantService.getUserPlants(req.user.userId);
    
    return {
      status: HttpStatus.OK,
      data: plants,
    };
  }

  // Fetch a particular plant using ID
  @Get(':plantId')
  async getPlant(@Param('plantId') plantId) {
    const plant = await this.plantService.getPlant(plantId);
    if (!plant) throw new NotFoundException('Plant does not exist!');
    return {
      status: HttpStatus.OK,
      data: plant,
    };
  }

  // Update a plant's details
  // @Put()
  // async updatePlant(@Res() res, @Query('plantID') plantID, @Body() createPlantDTO: CreatePlantDTO) {
  //     const plant = await this.plantService.updatePlant(plantID, createPlantDTO);
  //     if (!plant) throw new NotFoundException('Plant does not exist!');
  //     return res.status(HttpStatus.OK).json({
  //         message: 'Plant has been successfully updated',
  //         plant
  //     });
  // }

  // Delete a plant
  @Delete(':id')
  async deletePlant(@Param('id') plantId) {
    const plant = await this.plantService.deletePlant(plantId);
    
    if (!plant) throw new NotFoundException('Plant does not exist');
    
    return {
      status: HttpStatus.OK,
      message: 'Plant has been deleted!',
      data: plant,
    };
  }
}
