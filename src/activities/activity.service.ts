import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Repository, UpdateResult } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { ActivityType } from './entities/activity-type.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(ActivityType)
    private activityTypeRepository: Repository<ActivityType>,
  ) {}

  create(createActivityDto: CreateActivityDto): Promise<Activity> {
    return this.activityRepository.save(createActivityDto);
  }

  async findAll(userId: number, plantId: number): Promise<Activity[]> {
    const activities = await this.activityRepository.find({
      where: {
        user_id: userId,
        plant_id: plantId,
      },
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
