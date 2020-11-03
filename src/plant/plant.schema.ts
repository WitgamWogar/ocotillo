
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({default: Date.now })
  created_at: Date;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);