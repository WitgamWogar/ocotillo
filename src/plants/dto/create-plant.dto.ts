import { IsNotEmpty, IsIn, IsDateString, IsOptional } from 'class-validator';

export class CreatePlantDTO {
  @IsNotEmpty()
  scientific_name: string;
  
  @IsOptional()
  common_name: string;

  @IsOptional()
  nickname: string;

  @IsDateString({
      message: 'acquired_at must be a valid date',
  })
  acquired_at: Date;

  @IsNotEmpty()
  location: string;

  @IsIn(['collection', 'wishlist'])
  type: string;

  @IsIn(['Purchase', 'Purchased Seed', 'Wild Seed', 'Harvested Seed', 'Clone'])
  @IsNotEmpty()
  source: string;

  @IsNotEmpty()
  user_id: number;
}