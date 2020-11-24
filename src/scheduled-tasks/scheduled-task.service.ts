import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScheduledTaskDto } from './dto/create-scheduled-task.dto';
import { UpdateScheduledTaskDto } from './dto/update-scheduled-task.dto';
import { ScheduledTask } from './entities/scheduled-task.entity';
import { Repository, UpdateResult } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ScheduledTaskService {
  constructor(
    @InjectRepository(ScheduledTask)
    private scheduledTaskRepository: Repository<ScheduledTask>,
  ) {}

  create(createScheduledTaskDto: CreateScheduledTaskDto) {
    createScheduledTaskDto.last_completed_at = createScheduledTaskDto.start_at;

    return this.scheduledTaskRepository.save(createScheduledTaskDto);
  }

  // TODO Simplify this, findAllComplete, and findAllCurrentByPlant by using a filter instead of 3 routes
  async findAllCurrent(userId: number): Promise<ScheduledTask[]> {
    let query = this.scheduledTaskRepository
      .createQueryBuilder('scheduled_tasks')
      .leftJoinAndSelect('scheduled_tasks.activityType', 'activityType')
      .leftJoinAndSelect('scheduled_tasks.plant', 'plant')
      .leftJoinAndSelect('plant.photos', 'photos')
      .where({
        user_id: userId,
      })
      .andWhere('DATE(start_at) <= NOW()')
      .andWhere(
        'DATE_ADD(last_completed_at, INTERVAL (interval_days + snooze_days) DAY) <= NOW()',
      );

    return query.getMany();
  }

  async findAllComplete(userId: number): Promise<ScheduledTask[]> {
    let query = this.scheduledTaskRepository
      .createQueryBuilder('scheduled_tasks')
      .leftJoinAndSelect('scheduled_tasks.plant', 'plant')
      .leftJoinAndSelect('scheduled_tasks.activityType', 'activityType')
      .leftJoinAndSelect('plant.photos', 'photos')
      .where({
        user_id: userId,
      })
      .andWhere(
        'DATE_ADD(last_completed_at, INTERVAL (interval_days + snooze_days) DAY) >= NOW()',
      );

    return query.getMany();
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

  @OnEvent('activity.created', { async: true })
  async handleActivityCreatedEvent(payload) {
    this.scheduledTaskRepository.update(
      {
        user_id: payload.activity.user_id,
        activity_type_id: payload.activity.type_id,
        plant_id: payload.activity.plant_id,
      },
      {
        last_completed_at: payload.activity.performed_at,
        snooze_days: 0,
      },
    );
  }

  async findAllCurrentByPlant(
    userId: number,
    plantId: number,
  ): Promise<ScheduledTask[]> {
    let query = this.scheduledTaskRepository
      .createQueryBuilder('scheduled_tasks')
      .leftJoinAndSelect('scheduled_tasks.activityType', 'activityType')
      .where({
        user_id: userId,
        plant_id: plantId,
      })
      // There seems to be absolutely no way to get "due_date" returned to the client. #sad
      // Instead I am going to actually have a due_date column on the entity
      // and I am going to have to set it in the activity event... There has got to be a way to do this
      // but I spent way too much time trying to figure out if a "virtual column" is possible
      // https://github.com/typeorm/typeorm/issues/296
      .addSelect(
        'DATE_ADD(last_completed_at, INTERVAL interval_days DAY)',
        'scheduled_tasks.due_date',
      )
      .andWhere('DATE(start_at) <= NOW()')
      .andWhere(
        'DATE_ADD(last_completed_at, INTERVAL (interval_days + snooze_days) DAY) <= NOW()',
      );

    return query.getMany();
  }

  async findOne(id: number): Promise<ScheduledTask> {
    const task = await this.scheduledTaskRepository.findOne(id);

    return task;
  }

  async update(
    id: number,
    updateScheduledTaskDto: UpdateScheduledTaskDto,
  ): Promise<UpdateResult> {
    const task = await this.scheduledTaskRepository.update(
      id,
      updateScheduledTaskDto,
    );

    return task;
  }

  async remove(id: number): Promise<any> {
    const deletedTask = await this.scheduledTaskRepository.delete({
      id: id,
    });

    return deletedTask;
  }
}
