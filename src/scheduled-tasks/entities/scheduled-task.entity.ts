import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Plant } from '../../plants/plant.entity';
import { User } from '../../users/user.entity';
import { ActivityType } from '../../activities/entities/activity-type.entity';

@Entity({ name: 'scheduled_tasks' }) //otherwise singular is used
export class ScheduledTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  interval_days: number;

  @ManyToOne(
    type => Plant,
    plant => plant.photos,
  )
  @JoinColumn({ name: 'plant_id' }) //Otherwise it will try to do "plantId"
  plant: Plant;

  @Column()
  plant_id: number;

  @ManyToOne(
    type => User,
    user => user.plants,
  )
  @JoinColumn({ name: 'user_id' }) //Otherwise it will try to do "userId"
  user: User;

  @Column()
  user_id: number;

  @ManyToOne(type => ActivityType)
  @JoinColumn({ name: 'activity_type_id' }) //Otherwise it will try to do camelcase
  activityType: ActivityType;

  @Column()
  activity_type_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  start_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_completed_at: Date;
}
