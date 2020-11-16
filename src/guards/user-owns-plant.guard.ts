import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlantService } from '../plants/plant.service';

@Injectable()
export class UserOwnsPlantGuard implements CanActivate {
  constructor(
    private plantService: PlantService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const plant = await this.plantService.findOne(request.params.id);

    return userId === plant.user_id;
  }
}
