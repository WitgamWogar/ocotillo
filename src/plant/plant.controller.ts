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
import { PlantService } from './plant.service';
import { CreatePlantDTO } from './dto/create-plant.dto';
import { diskStorage } from 'multer';
import { generateFilename, imageFileFilter } from '../utils/file-upload';

@Controller('plant')
export class PlantController {
  constructor(private plantService: PlantService) {}

  // add a plant
  @Post()
  async addPlant(@Res() res, @Body() createPlantDTO: CreatePlantDTO) {
    const plant = await this.plantService.addPlant(createPlantDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Plant has been created successfully',
      plant,
    });
  }

  @Post('photos')
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: diskStorage({
        destination: './uploads/plants',
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
  @Get()
  async getAllPlants(@Res() res) {
    const plants = await this.plantService.getAllPlants();
    return res.status(HttpStatus.OK).json(plants);
  }

  // Fetch a particular plant using ID
  @Get(':plantID')
  async getPlant(@Res() res, @Param('plantId') plantId) {
    const plant = await this.plantService.getPlant(plantId);
    if (!plant) throw new NotFoundException('Plant does not exist!');
    return res.status(HttpStatus.OK).json(plant);
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
  @Delete()
  async deletePlant(@Res() res, @Query('plantId') plantId) {
    //TODO Model injection possible with nest.js?
    console.log(plantId);
    const plant = await this.plantService.deletePlant(plantId);
    if (!plant) throw new NotFoundException('Plant does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Plant has been deleted',
      plant,
    });
  }
}
