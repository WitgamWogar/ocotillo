import { IsEmail, IsNotEmpty, IsIn, IsDate, IsDateString } from 'class-validator';

export class CreatePhotoDTO {
  originalname: String;
  mimetype: String;
  path: String;
  plant: Object;
  plantId: String;
  readonly created_at: Date;
}