import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ScheduledTaskService } from './scheduled-task.service';
import { CreateScheduledTaskDto } from './dto/create-scheduled-task.dto';
import { UpdateScheduledTaskDto } from './dto/update-scheduled-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserOwnsScheduledTaskGuard } from '../guards/user-owns-scheduled-task.guard';

@Controller('scheduled-task')
export class ScheduledTaskController {
  constructor(private readonly scheduledTaskService: ScheduledTaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Request() req,
    @Body() createScheduledTaskDto: CreateScheduledTaskDto,
  ) {
    createScheduledTaskDto.user_id = req.user.userId;

    return this.scheduledTaskService.create(createScheduledTaskDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.scheduledTaskService.findAll(req.user.userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get(':plantId')
  async findAllByPlant(@Request() req, @Param('plantId') plantId) {
    const tasks = await this.scheduledTaskService.findAllByPlant(
      req.user.userId,
      plantId,
    );

    return {
      status: HttpStatus.OK,
      data: tasks,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get(':plantId/current')
  async findAllCurrent(@Request() req, @Param('plantId') plantId) {
    const tasks = await this.scheduledTaskService.findAllCurrent(
      req.user.userId,
      plantId,
    );

    return {
      status: HttpStatus.OK,
      data: tasks,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserOwnsScheduledTaskGuard)
  findOne(@Param('id') id: string) {
    return this.scheduledTaskService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, UserOwnsScheduledTaskGuard)
  update(
    @Param('id') id: string,
    @Body() updateScheduledTaskDto: UpdateScheduledTaskDto,
  ) {
    return this.scheduledTaskService.update(+id, updateScheduledTaskDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserOwnsScheduledTaskGuard)
  remove(@Param('id') id: string) {
    return this.scheduledTaskService.remove(+id);
  }
}
