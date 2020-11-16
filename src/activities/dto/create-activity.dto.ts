import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateActivityDto {
  @IsDateString({
    message: 'performed_at must be a valid date',
  })
  performed_at: Date;

  @IsNotEmpty()
  type: string;
  
  note: string;

  @IsNotEmpty()
  icon: string;

  plant_id: number;

  user_id: number;
}
