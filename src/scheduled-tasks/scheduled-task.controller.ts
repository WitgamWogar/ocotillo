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
import { ScheduledTask } from './entities/scheduled-task.entity';
import { ActivityService } from 'src/activities/activity.service';

@Controller('scheduled-task')
export class ScheduledTaskController {
  constructor(
    private readonly scheduledTaskService: ScheduledTaskService,
    private readonly activityService: ActivityService,
  ) {}

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
  @Get('current')
  async findAllCurrent(@Request() req) {
    const tasks = await this.scheduledTaskService.findAllCurrent(
      req.user.userId,
    );

    return {
      status: HttpStatus.OK,
      data: tasks,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('complete')
  async findAllComplete(@Request() req) {
    const tasks = await this.scheduledTaskService.findAllComplete(
      req.user.userId,
    );

    return {
      status: HttpStatus.OK,
      data: tasks,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('/plant/:plantId')
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
  @Get('/plant/:plantId/current')
  async findAllCurrentByPlant(@Request() req, @Param('plantId') plantId) {
    const tasks = await this.scheduledTaskService.findAllCurrentByPlant(
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
  findOne(@Param('id') id: number) {
    return this.scheduledTaskService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, UserOwnsScheduledTaskGuard)
  update(
    @Param('id') id: number,
    @Body() updateScheduledTaskDto: UpdateScheduledTaskDto,
  ) {
    return this.scheduledTaskService.update(+id, updateScheduledTaskDto);
  }

  @Post('complete-batch')
  @UseGuards(JwtAuthGuard)
  async completeBatch(@Request() req, @Body() tasks: ScheduledTask[]) {
    for (const task of tasks) {
      let taskRecord = await this.scheduledTaskService.findOne(task.id);
      console.log(taskRecord, req.user.userId);
      if (taskRecord.user_id !== req.user.userId) {
        return {
          status: HttpStatus.FORBIDDEN,
        };
      }
    }

    return this.activityService.createBatch(tasks);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserOwnsScheduledTaskGuard)
  remove(@Param('id') id: number) {
    return this.scheduledTaskService.remove(+id);
  }
}
