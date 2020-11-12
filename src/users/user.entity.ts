
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity({name: "users"}) //otherwise "user" is used
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
   async hashPassword() {
      this.password = await bcrypt.hash(this.password, Number(process.env.HASH_SALT));
   }
}