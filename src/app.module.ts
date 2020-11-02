import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule} from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { PlantModule } from './plant/plant.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    PlantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
