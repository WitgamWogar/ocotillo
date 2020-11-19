import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScheduledTaskDto } from './dto/create-scheduled-task.dto';
import { UpdateScheduledTaskDto } from './dto/update-scheduled-task.dto';
import { ScheduledTask } from './entities/scheduled-task.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ScheduledTaskService {
  constructor(
    @InjectRepository(ScheduledTask)
    private scheduledTaskRepository: Repository<ScheduledTask>,
  ) {}

  create(createScheduledTaskDto: CreateScheduledTaskDto) {
    return this.scheduledTaskRepository.save(createScheduledTaskDto);
  }

  async findAll(userId: number): Promise<ScheduledTask[]> {
    const tasks = await this.scheduledTaskRepository.find({
      where: {
        user_id: userId,
      },
    });

    return tasks;
  }

  async findAllByPlant(
    userId: number,
    plantId: number,
  ): Promise<ScheduledTask[]> {
    const tasks = await this.scheduledTaskRepository.find({
      where: {
        user_id: userId,
        plant_id: plantId,
      },
      relations: ['activityType'],
    });

    return tasks;
  }

  async findOne(id: number): Promise<ScheduledTask> {
    const task = await this.scheduledTaskRepository.findOne(id);

    return task;
  }

  update(id: number, updateScheduledTaskDto: UpdateScheduledTaskDto) {
    return `This action updates a #${id} scheduledTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduledTask`;
  }
}
