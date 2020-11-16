import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  HttpStatus,
  Param,
  Delete,
  Request,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createActivityDto: CreateActivityDto) {
    createActivityDto.user_id = req.user.userId;
    return this.activityService.create(createActivityDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get(':plantId')
  async findAll(@Request() req, @Param('plantId') plantId) {
    const activities = this.activityService.findAll(req.user.userId, plantId);

    return {
      status: HttpStatus.OK,
      data: activities,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.update(+id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(+id);
  }
}
