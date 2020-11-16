import { IsNotEmpty, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';
import { Exclude } from 'class-transformer';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}
