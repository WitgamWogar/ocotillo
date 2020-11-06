import { IsEmail, IsNotEmpty, IsIn, IsDate, IsDateString } from 'class-validator';

export class CreatePlantDTO {
  @IsNotEmpty()
  scientific_name: string;

  common_name: string;

  nickname: string;

  @IsDateString({
      message: 'acquired_at must be a valid date',
  })
  acquired_at: Date;

  @IsNotEmpty()
  location: string;

  @IsIn(['Purchase', 'Purchased Seed', 'Wild Seed', 'Harvested Seed', 'Clone'])
  @IsNotEmpty()
  source: string;

  readonly created_at: Date;
}