import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;
  
  @IsNotEmpty()
  @IsEmail()
  //TODO create a custom validation decorator to enforce unique
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  //TODO create a custom validation decorator to enforce confirmation
  password_confirmation: string;
}