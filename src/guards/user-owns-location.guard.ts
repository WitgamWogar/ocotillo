import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { LocationService } from '../locations/location.service';

@Injectable()
export class UserOwnsLocationGuard implements CanActivate {
  constructor(private locationService: LocationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const location = await this.locationService.findOne(request.params.id);

    return userId === location.user_id;
  }
}
