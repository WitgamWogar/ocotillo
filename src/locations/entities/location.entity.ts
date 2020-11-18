import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Plant } from '../../plants/plant.entity';

@Entity({ name: 'locations' }) //otherwise singular is used
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    type => User,
    user => user.locations,
  )
  @JoinColumn({ name: 'user_id' }) //Otherwise it will try to do "userId"
  user: User;

  @Column()
  user_id: number;

  @OneToMany(
    type => Plant,
    plant => plant.location,
    {
      cascade: ['update'],
    },
  )
  plants: Plant[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
