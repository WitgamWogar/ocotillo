import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { Location } from './entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
