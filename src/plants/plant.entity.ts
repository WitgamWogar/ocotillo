import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Photo } from '../photos/photo.entity';
import { User } from '../users/user.entity';
import { Activity } from '../activities/entities/activity.entity';

@Entity({ name: 'plants' }) //otherwise "plant" is used
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scientific_name: string;

  @Column()
  common_name: string;

  @Column({ nullable: false })
  nickname: string;

  @Column()
  acquired_at: Date;

  @Column()
  source: string;

  @Column()
  location: string;

  @Column({ default: 'collection' })
  type: string;

  @ManyToOne(
    type => User,
    user => user.plants,
  )
  @JoinColumn({ name: 'user_id' }) //Otherwise it will try to do "userId"
  user: User;

  @Column()
  user_id: number;

  @OneToMany(
    type => Photo,
    photo => photo.plant,
  )
  photos: Photo[];

  @OneToMany(
    type => Activity,
    activity => activity.plant,
  )
  activities: Activity[];

  @Column({ type: 'longtext', nullable: true })
  care_notes: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
