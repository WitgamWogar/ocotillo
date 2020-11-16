import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
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

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
