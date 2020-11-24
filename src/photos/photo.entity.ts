import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Plant } from '../plants/plant.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'photos' }) //otherwise "photo" is used
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  path: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' }) //Otherwise it will try to do "userId"
  user: User;

  @Column()
  user_id: number;

  @ManyToOne(
    type => Plant,
    plant => plant.photos,
  )
  @JoinColumn({ name: 'plant_id' }) //Otherwise it will try to do "plantId"
  plant: Plant;

  @Column()
  plant_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
