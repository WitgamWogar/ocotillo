import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantDTO } from './create-plant.dto';

export class UpdatePlantDTO extends PartialType(CreatePlantDTO) {}