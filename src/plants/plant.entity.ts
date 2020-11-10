
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from '../photos/photo.entity';

@Entity({name: "plants"})
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scientific_name: string;

  @Column()
  common_name: string;

  @Column()
  nickname: string;

  @Column()
  acquired_at: Date;

  @Column()
  source: string;

  @Column()
  location: string;

  @OneToMany(type => Photo, photo => photo.plant)
  photos: Photo[];

  @Column({default: Date.now })
  created_at: Date;
}