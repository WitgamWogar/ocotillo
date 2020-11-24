import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduledTaskDto } from './create-scheduled-task.dto';
import { IsOptional } from 'class-validator';

export class UpdateScheduledTaskDto extends PartialType(
  CreateScheduledTaskDto,
) {
  @IsOptional()
  snooze_days: number;
}
