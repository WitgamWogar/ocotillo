import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { PlantService } from './plant.service';
import { CreatePlantDTO } from './dto/create-plant.dto';

@Controller('plant')
export class PlantController {
    constructor(private plantService: PlantService) { }

    // add a plant
    @Post()
    async addPlant(@Res() res, @Body() createPlantDTO: CreatePlantDTO) {
        const plant = await this.plantService.addPlant(createPlantDTO);
        return res.status(HttpStatus.OK).json({
            message: "Plant has been created successfully",
            plant
        })
    }

    // Retrieve plants list
    @Get()
    async getAllPlant(@Res() res) {
        const plants = await this.plantService.getAllPlant();
        return res.status(HttpStatus.OK).json(plants);
    }

    // Fetch a particular plant using ID
    @Get(':plantID')
    async getPlant(@Res() res, @Param('plantID') plantID) {
        const plant = await this.plantService.getPlant(plantID);
        if (!plant) throw new NotFoundException('Plant does not exist!');
        return res.status(HttpStatus.OK).json(plant);
    }

    // Update a plant's details
    @Put()
    async updatePlant(@Res() res, @Query('plantID') plantID, @Body() createPlantDTO: CreatePlantDTO) {
        const plant = await this.plantService.updatePlant(plantID, createPlantDTO);
        if (!plant) throw new NotFoundException('Plant does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Plant has been successfully updated',
            plant
        });
    }

    // Delete a plant
    @Delete()
    async deletePlant(@Res() res, @Query('plantID') plantID) {
        const plant = await this.plantService.deletePlant(plantID);
        if (!plant) throw new NotFoundException('Plant does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Plant has been deleted',
            plant
        })
    }
}