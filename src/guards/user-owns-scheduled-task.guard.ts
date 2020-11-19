import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlantService } from '../plants/plant.service';
import { ScheduledTaskService } from '../scheduled-tasks/scheduled-task.service';

@Injectable()
export class UserOwnsScheduledTaskGuard implements CanActivate {
  constructor(private scheduledTaskService: ScheduledTaskService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const task = await this.scheduledTaskService.findOne(request.params.id);

    return userId === task.user_id;
  }
}
