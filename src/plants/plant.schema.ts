
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Photo } from 'src/photos/photo.schema';

export type PlantDocument = Plant & Document;

@Schema()
export class Plant {
  @Prop()
  id: number;

  @Prop()
  @Exclude()
  scientific_name: string;

  @Prop()
  common_name: string;

  @Prop()
  nickname: string;

  @Prop()
  acquired_at: Date;

  @Prop()
  source: string;

  @Prop()
  location: string;

  @Prop({ type: [Types.ObjectId], ref: Photo })
  photos: Photo[];

  @Prop({default: Date.now })
  created_at: Date;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);