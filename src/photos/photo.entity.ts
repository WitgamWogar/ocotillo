import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Plant } from '../plants/plant.entity';

@Entity({name: "photos",})
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  path: string;

  //Doesnt work
  @ManyToOne(
    type => Plant,
    plant => plant.photos,
  )
  @JoinColumn({ name: "plant_id" }) //Otherwise it will try to do "plantId"
  plant: Plant;

  @Column()
  plant_id: number; 

  @Column({ default: Date.now })
  created_at: Date;
}
