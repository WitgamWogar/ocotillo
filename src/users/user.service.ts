
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}