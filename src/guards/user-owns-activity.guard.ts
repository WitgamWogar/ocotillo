import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ActivityService } from '../activities/activity.service';

@Injectable()
export class UserOwnsActivityGuard implements CanActivate {
  constructor(
    private activityService: ActivityService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const activity = await this.activityService.findOne(request.params.id);

    return userId === activity.user_id;
  }
}
