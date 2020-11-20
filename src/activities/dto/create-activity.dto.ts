import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateActivityDto {
  @IsDateString({
    message: 'performed_at must be a valid date',
  })
  performed_at: Date;

  @IsNotEmpty()
  type_id: number;

  @IsOptional()
  note: string;

  @IsNotEmpty()
  plant_id: number;

  @IsOptional()
  user_id: number;
}
