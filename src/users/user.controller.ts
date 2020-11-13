import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.register(createUserDTO);
  }
}
