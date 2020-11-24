import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PhotoService } from '../photos/photo.service';

@Injectable()
export class UserOwnsPhotoGuard implements CanActivate {
  constructor(private photoService: PhotoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const photo = await this.photoService.findOne(request.params.id);

    return userId === photo.user_id;
  }
}
