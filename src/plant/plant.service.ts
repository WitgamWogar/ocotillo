import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Plant } from './interfaces/plant.interface';
import { CreatePlantDTO } from './dto/create-plant.dto';

@Injectable()
export class PlantService {
    constructor(@InjectModel('Plant') private readonly plantModel: Model<Plant>) { }
    // fetch all plants
    async getAllPlant(): Promise<Plant[]> {
        const plants = await this.plantModel.find().exec();
        return plants;
    }
    // Get a single plant
    async getPlant(plantID): Promise<Plant> {
        const plant = await this.plantModel.findById(plantID).exec();
        return plant;
    }
    // post a single plant
    async addPlant(createPlantDTO: CreatePlantDTO): Promise<Plant> {
        const newPlant = new this.plantModel(createPlantDTO);
        return newPlant.save();
    }
    // Edit plant details
    async updatePlant(plantID, createPlantDTO: CreatePlantDTO): Promise<Plant> {
        const updatedPlant = await this.plantModel
            .findByIdAndUpdate(plantID, createPlantDTO, { new: true });
        return updatedPlant;
    }
    // Delete a plant
    async deletePlant(plantID): Promise<any> {
        const deletedPlant = await this.plantModel.findByIdAndRemove(plantID);
        return deletedPlant;
    }
}