import { IsNotEmpty, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';
import { Exclude } from 'class-transformer';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
  @IsDateString({
    message: 'acquired_at must be a valid date',
  })
  performed_at: Date;
  
  type: string;

  note: string;
  
  icon: string;

  @Exclude() //TODO there is a way to auto exclude non-existing columns, don't remember at this time
  color: string;

  @Exclude() // TODO ^^^
  text: string;
}
