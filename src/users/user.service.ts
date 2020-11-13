
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import bcrypt from 'bcrypt';

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

  async register(createUserDto: CreateUserDTO): Promise<User> {
    const { email, password, first_name, last_name } = createUserDto;
    
    const userInDb = await this.userRepository.findOne({ 
        where: { email } 
    });
    
    if (userInDb) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);    
    }
    
    const user: User = await this.userRepository.create({ password, email, first_name, last_name });
    
    await this.userRepository.save(user);
    
    return user;  
  }
}