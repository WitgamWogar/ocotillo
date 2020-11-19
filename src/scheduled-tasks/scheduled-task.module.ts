import { Module } from '@nestjs/common';
import { ScheduledTaskService } from './scheduled-task.service';
import { ScheduledTaskController } from './scheduled-task.controller';
import { ScheduledTask } from './entities/scheduled-task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduledTask])],
  controllers: [ScheduledTaskController],
  providers: [ScheduledTaskService],
})
export class ScheduledTaskModule {}
