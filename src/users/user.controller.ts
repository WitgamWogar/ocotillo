import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.register(createUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async getCurrentUser(@Request() req) {
    return req.user;
  }
}