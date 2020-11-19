import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'activity_types' }) //otherwise singular is used
export class ActivityType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  icon: string;

  @Column()
  name: string;

  @Column()
  color: string;
}
