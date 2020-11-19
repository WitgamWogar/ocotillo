import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateScheduledTaskDto {
  @IsNotEmpty()
  interval_days: number;

  @IsNotEmpty()
  activity_type_id: number;

  @IsNotEmpty()
  plant_id: number;

  @IsOptional()
  user_id: number;

  @IsDateString({
    message: 'start_at must be a valid date',
  })
  start_at: Date;
}
