import {
  IsEmail,
  IsNotEmpty,
  IsIn,
  IsDate,
  IsDateString,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class CreatePhotoDTO {
  originalname: string;
  mimetype: string;
  path: string;

  plant_id: number;

  @Expose()
  get url(): string {
    return `http://localhost:8080/ ${this.path}`;
  }

  readonly created_at: Date;
}
