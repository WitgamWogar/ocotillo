import { IsEmail, IsNotEmpty, IsIn, IsDate } from 'class-validator';

export class CreatePlantDTO {
  @IsNotEmpty()
  scientific_name: string;

  common_name: string;

  nickname: string;

  @IsDate({
      message: 'acquisition_date must be a valid date',
  })
  acquired_at: Date;

  @IsNotEmpty()
  location: string;

  @IsIn(['Purchase', 'Purchased Seed', 'Wild Seed', 'Harvested Seed', 'Clone'])
  @IsNotEmpty()
  source: string;

  readonly created_at: Date;
}