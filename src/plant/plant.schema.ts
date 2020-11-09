
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Photo } from 'src/photo/photo.schema';

export type PlantDocument = Plant & Document;

@Schema()
export class Plant {
  @Prop()
  id: number;

  @Prop()
  scientific_name: string;

  @Prop()
  common_name: string;

  @Prop()
  nickname: string;

  @Prop()
  acquired_at: Date;

  @Prop([String])
  source: string[];

  @Prop()
  location: string;

  @Prop({ type: [Types.ObjectId], ref: Photo })
  photos: Photo[];

  @Prop({default: Date.now })
  created_at: Date;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);