import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Plant } from '../../plants/plant.entity';
import { User } from '../../users/user.entity';

@Entity({name: "activities"}) //otherwise "photo" is used
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  type: string;
  
  @Column({type: 'longtext', nullable: true})
  note: string;
  
  @Column()
  icon: string;

  @ManyToOne(
    type => Plant,
    plant => plant.activities,
  )
  @JoinColumn({ name: "plant_id" }) //Otherwise it will try to do "plantId"
  plant: Plant;

  @Column()
  plant_id: number;

  @ManyToOne(
    type => User,
  )
  @JoinColumn({ name: "user_id" }) //Otherwise it will try to do "userId"
  user: User;
  
  @Column()
  user_id: number;
  

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  performed_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
