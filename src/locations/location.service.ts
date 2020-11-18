import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  async findAll(userId: number): Promise<Location[]> {
    const locations = await this.locationRepository.find({
      where: {
        user_id: userId,
      },
      relations: ['plants'],
    });

    return locations;
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne(id);

    return location;
  }

  async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<UpdateResult> {
    const location = await this.locationRepository.update(
      id,
      updateLocationDto,
    );

    return location;
  }

  async remove(id: number): Promise<any> {
    const deletedLocation = await this.locationRepository.delete({
      id: id,
    });

    return deletedLocation;
  }
}
