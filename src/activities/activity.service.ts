import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Repository, UpdateResult } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { ActivityType } from './entities/activity-type.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(ActivityType)
    private activityTypeRepository: Repository<ActivityType>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity = await this.activityRepository.save(createActivityDto);

    this.eventEmitter.emit('activity.created', {
      activity: activity,
    });

    return activity;
  }

  async findAll(userId: number, plantId: number): Promise<Activity[]> {
    const activities = await this.activityRepository.find({
      where: {
        user_id: userId,
        plant_id: plantId,
      },
      relations: ['type'],
    });

    return activities;
  }

  async findAllActivityTypes(): Promise<ActivityType[]> {
    const types = await this.activityTypeRepository.find();

    return types;
  }

  async findOne(id: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne(id);

    return activity;
  }

  async update(
    id: number,
    updateActivityDto: UpdateActivityDto,
  ): Promise<UpdateResult> {
    const activity = await this.activityRepository.update(
      id,
      updateActivityDto,
    );

    return activity;
  }

  async remove(id: number): Promise<any> {
    const deletedActivity = await this.activityRepository.delete({
      id: id,
    });

    return deletedActivity;
  }
}
