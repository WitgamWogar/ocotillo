import {
  IsEmail,
  IsNotEmpty,
  IsIn,
  IsDate,
  IsDateString,
} from 'class-validator';

export class CreatePhotoDTO {
  originalname: string;
  mimetype: string;
  path: string;

  plant_id: number;

  readonly created_at: Date;
}
