import { IsNotEmpty, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
  @IsDateString({
    message: 'acquired_at must be a valid date',
  })
  performed_at: Date;
  
  type: string;

  note: string;
  
  icon: string;
}
