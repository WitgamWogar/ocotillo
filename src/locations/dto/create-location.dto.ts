import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  user_id: number;
}
