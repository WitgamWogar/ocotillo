import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserOwnsLocationGuard } from '../guards/user-owns-location.guard';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createActivityDto: CreateLocationDto) {
    createActivityDto.user_id = req.user.userId;
    return this.locationService.create(createActivityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.locationService.findAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, UserOwnsLocationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, UserOwnsLocationGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @UseGuards(JwtAuthGuard, UserOwnsLocationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
